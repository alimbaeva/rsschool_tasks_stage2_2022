import './sources.css';

type TypeGetSources = {
  category: string,
  country: string,
  description: string,
  id: string,
  language: string,
  name: string,
  url: string
};
class Sources {
  draw(data: TypeGetSources[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
    
    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as Element;
  
      (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
      (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
  
      fragment.append(sourceClone);
    });

    (document.querySelector('.sources') as HTMLElement).append(fragment);
  }
}

export default Sources;
