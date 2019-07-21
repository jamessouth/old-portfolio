import { projects } from './projects';


const styleTag = `
<style>
div:focus,
.anch:focus{
  outline: none;
  background-color: #1a2845;
  color: #e5d7ba;
}
img{
  width: 100%;
  height: 100%;
  grid-area: top;
}
h3, p, .anch{
  text-align: center;
  color: #30511d;
}
h3{
  font-size: 2em;
  line-height: 1.5;
  margin: 0;
}
p{
  margin: 0;
  font-size: 1.5em;
  line-height: 1;
  height: 24px;
  font-weight: bold;
}
p:last-of-type{
  border-bottom: 1px solid #30511d;
  padding-bottom: .5rem;
}
.anch{
  width: calc(100% - 2px);
  height: 30px;
  line-height: 0.8;
  font-size: 2em;
  text-decoration: none;
  border: 1px solid #30511d;
  font-weight: bold;
}
div{
  display: grid;
  grid: "top top" 90% "lbot rbot" 10% / 1fr 1fr;
  justify-items: center;
  width: 288px;
  height: 320px;
}
`;
const oneAnchorStyle = `
.anch{
  grid-column: 1 / -1;
`;
const twoAnchorsStyle = `
.anch:first-of-type{
  grid-area: lbot;
}
.anch:last-of-type{
  grid-area: rbot;
`;


function panelMarkupTag(strings, ...anchors) {
  const str = [...anchors].map(anc => `<a class="anch" rel="noopener noreferrer">${anc}</a>`).join('\n      ');

  return `
    <h3></h3>
    <p></p>
    <p></p>
    <div>
      <img/>
      ${str}
    </div>
    `;
}

let fff = `
  <h3></h3>
  <p></p>
  <p></p>
  <div>
    <img/>
    <a></a>
  </div>
  `;

export default function contentLoader(divs) {
  divs.forEach((div, i) => {

    const panelFragment = document.createDocumentFragment();

    let h3 = document.createElement('h3');
    panelFragment.appendChild(h3);


    let p1 = document.createElement('p');
    panelFragment.appendChild(p1);

    let p2 = document.createElement('p');
    panelFragment.appendChild(p2);

    let divi = document.createElement('div');
    divi.innerHTML = `<img/><a></a>`;
    panelFragment.appendChild(divi);





    div.appendChild(panelFragment);





    // image.setAttribute('src', projects[i].src);
    // div.appendChild(image);
  });
}
