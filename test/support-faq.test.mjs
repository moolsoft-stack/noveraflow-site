import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mountSupportFaq} from '../js/support-faq.js';
class Node {
  constructor(tag){this.tag=tag;this.children=[];this.textContent='';this.value='';this.events={};}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(...nodes){this.children=nodes;}
  setAttribute(){}
  addEventListener(name,fn){this.events[name]=fn;}
}
test('site FAQ searches SITE scope, revalidates details and deduplicates feedback without identity',async()=>{
  const host=new Node('div'),requests=[],item={faqId:'11111111-1111-4111-8111-111111111111',question:'Connection help',answer:'Approved answer',version:3};
  globalThis.document={createElement:tag=>new Node(tag),documentElement:{lang:'en'}};
  globalThis.window={addEventListener(){}};
  try {
    const mounted=mountSupportFaq(host,{endpoint:'http://127.0.0.1/api/public/support-faq',fetchImpl:async(url,options)=>{
      requests.push({url:String(url),...options});return {ok:true,json:async()=>({items:[item]})};
    }});await mounted.refresh();
    const form=host.children[1],results=host.children[3];form.children[0].value='connection';
    await form.onsubmit({preventDefault(){}});await new Promise(resolve=>setImmediate(resolve));
    const card=results.children[0];card.open=true;await card.events.toggle();
    const body=card.children[1];assert.equal(body.children[0].textContent,'Approved answer');
    await body.children[1].onclick();await body.children[2].onclick();
    const votes=requests.filter(r=>r.method==='POST'&&['helpful','unhelpful'].includes(JSON.parse(r.body).kind));assert.equal(votes.length,1);
    assert.ok(requests.some(r=>r.url.includes('query=connection')));
    for(const r of requests){assert.equal(new URL(r.url).searchParams.get('scope'),'site');assert.equal(r.credentials,'omit');if(r.body)assert.deepEqual(Object.keys(JSON.parse(r.body)),['kind','version','receipt']);}
    assert.equal(body.children.at(-1).href,'/contact.html');
  } finally {delete globalThis.document;delete globalThis.window;}
});
