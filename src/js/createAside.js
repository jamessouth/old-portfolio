export default function createAside(pdf) {
  const frag = document.createDocumentFragment();
  const obj = document.createElement('object');
  obj.setAttribute('type', 'application/pdf');
  obj.setAttribute('data', pdf);
  const ifrm = document.createElement('iframe');
  ifrm.setAttribute('title', 'pdf of my résumé');
  ifrm.setAttribute('src', pdf);
  const para = document.createElement('p');
  para.textContent = 'Your browser does not support PDFs.';
  const anc = document.createElement('a');
  anc.setAttribute('href', pdf);
  anc.textContent = 'Download PDF';
  para.appendChild(anc);
  ifrm.appendChild(para);
  obj.appendChild(ifrm);
  frag.appendChild(obj);

  return frag;
}
