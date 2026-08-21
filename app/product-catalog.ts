export const productPackages = [
  { id:"landing", name:"Landing Page", priceCents:79000, description:"Uma página focada em apresentar, captar contatos e vender.", delivery:"até 7 dias", includes:["Página completa","Formulário e WhatsApp","Versão para celular","Publicação inclusa"] },
  { id:"institucional", name:"Site Institucional", priceCents:149000, description:"Presença profissional completa para empresas e serviços.", delivery:"até 12 dias", includes:["Até 5 páginas","Serviços e sobre","Formulários","Publicação inclusa"] },
  { id:"portal", name:"Portal Simples", priceCents:299000, description:"Conteúdo organizado com login e uma área reservada básica.", delivery:"até 20 dias", includes:["Até 8 páginas","Login de usuários","Área reservada","Publicação inclusa"] },
] as const;
export const productAddons = [
  { id:"extra-page", name:"Página adicional", priceCents:15000 },
  { id:"blog", name:"Blog ou notícias", priceCents:35000 },
  { id:"booking", name:"Agendamento online", priceCents:45000 },
  { id:"catalog", name:"Catálogo de produtos", priceCents:59000 },
] as const;
export function quoteProduct(packageId:string, addonIds:string[]) { const product=productPackages.find(item=>item.id===packageId); if(!product)return null; const addons=productAddons.filter(item=>addonIds.includes(item.id)); return { product, addons, totalCents:product.priceCents+addons.reduce((sum,item)=>sum+item.priceCents,0) }; }
export function formatPrice(cents:number){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100)}
