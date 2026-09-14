const labels={
  ko:{title:'승인된 도움말',search:'FAQ 검색',all:'모든 유형',loading:'불러오는 중…',empty:'표시할 도움말이 없습니다.',error:'도움말을 불러오지 못했습니다. 다시 시도해 주세요.',retry:'다시 시도',helpful:'도움 됨',unhelpful:'도움 안 됨',contact:'해결되지 않았나요? 앱 설정의 1:1 문의에서 로그인 후 상담을 이어가세요.',open:'앱 지원 안내',saved:'평가가 저장되었습니다.',categories:{account:'계정',payment:'결제',bug:'문제 해결',feature:'기능',data:'데이터',other:'기타'}},
  en:{title:'Reviewed help',search:'Search FAQ',all:'All categories',loading:'Loading…',empty:'No help articles available.',error:'Unable to load help. Please retry.',retry:'Retry',helpful:'Helpful',unhelpful:'Not helpful',contact:'Still need help? Sign in through Settings → 1:1 Inquiry in the app.',open:'App support guide',saved:'Feedback saved.',categories:{account:'Account',payment:'Payment',bug:'Troubleshooting',feature:'Features',data:'Data',other:'Other'}},
  ja:{title:'確認済みのヘルプ',search:'FAQを検索',all:'すべての種類',loading:'読み込み中…',empty:'表示するヘルプがありません。',error:'ヘルプを読み込めません。再試行してください。',retry:'再試行',helpful:'役に立った',unhelpful:'役に立たなかった',contact:'解決しない場合は、アプリの設定→1:1お問い合わせからログインしてご相談ください。',open:'アプリのサポート案内',saved:'評価を保存しました。',categories:{account:'アカウント',payment:'支払い',bug:'トラブルシューティング',feature:'機能',data:'データ',other:'その他'}}
};
export function mountSupportFaq(host,{fetchImpl=fetch,endpoint='https://admin.noveraflow.com/api/public/support-faq',language=()=>document.documentElement.lang}={}) {
  let sequence=0, controller, receipt=crypto.randomUUID();
  const sent=new Set();
  const node=(tag,text)=>{const n=document.createElement(tag);if(text)n.textContent=text;return n;};
  const url=(suffix='',params={})=>{const u=new URL(endpoint+suffix);u.search=new URLSearchParams({scope:'site',language:language(),...params});return u;};
  const metric=async(item,kind)=>{
    const key=`${item.faqId}:${item.version}:${kind==='helpful'||kind==='unhelpful'?'vote':kind}`;
    if(sent.has(key))return;sent.add(key);
    try{const r=await fetchImpl(url(`/${item.faqId}/events`),{method:'POST',credentials:'omit',headers:{'content-type':'application/json'},body:JSON.stringify({kind,version:item.version,receipt})});if(!r.ok)throw Error();}
    catch{sent.delete(key);throw Error();}
  };
  async function render(){
    const t=labels[language()]||labels.en;
    host.replaceChildren();host.append(node('h2',t.title));
    const form=node('form');form.className='faq-search';
    const input=node('input');input.type='search';input.maxLength=240;input.setAttribute('aria-label',t.search);input.placeholder=t.search;
    const category=node('select');category.setAttribute('aria-label',t.all);
    for(const [value,label] of [['',t.all],...Object.entries(t.categories)]){const option=node('option',label);option.value=value;category.append(option);}
    const submit=node('button',t.search);form.append(input,category,submit);host.append(form);
    const status=node('p');status.setAttribute('role','status');const results=node('div');host.append(status,results);
    const load=async()=>{const own=++sequence;controller?.abort();controller=new AbortController();results.replaceChildren();status.textContent=t.loading;
      try{const response=await fetchImpl(url('',{query:input.value,category:category.value}),{credentials:'omit',signal:controller.signal});if(!response.ok)throw Error();const data=await response.json();if(own!==sequence)return;
        status.textContent=data.items.length?'':t.empty;
        for(const item of data.items){const card=node('details');const title=node('summary',item.question);const body=node('div');card.append(title,body);results.append(card);
          if(input.value)metric(item,'recommendation').catch(()=>{});
          card.addEventListener('toggle',async()=>{if(!card.open)return;body.textContent=t.loading;
            try{const r=await fetchImpl(url(`/${item.faqId}`),{credentials:'omit'});if(!r.ok)throw Error();const fresh=(await r.json()).items[0];if(own!==sequence)return;
              body.replaceChildren(node('p',fresh.answer));metric(fresh,'view').catch(()=>{});
              for(const kind of ['helpful','unhelpful']){const b=node('button',t[kind]);b.type='button';body.append(b);b.onclick=async()=>{b.disabled=true;try{await metric(fresh,kind);status.textContent=t.saved;}catch{status.textContent=t.error;b.disabled=false;}};}
              const guide=node('p',t.contact), link=node('a',t.open);link.href='/contact.html';link.onclick=()=>{metric(fresh,'conversion').catch(()=>{});};body.append(guide,link);
            }catch{body.textContent=t.error;}
          });
        }
      }catch(e){if(e.name!=='AbortError'&&own===sequence)status.textContent=t.error;}
    };
    form.onsubmit=e=>{e.preventDefault();return load();};await load();
  }
  window.addEventListener('noveraflow:localechange',render);render();
  return {refresh:render};
}
if(typeof document!=='undefined') { const host=document.getElementById('supportFaq');if(host)mountSupportFaq(host); }
