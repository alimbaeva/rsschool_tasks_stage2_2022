class Size {
  sizeChange() : void {
    const windowSize = document.documentElement.clientWidth;
    if (windowSize > 500) {
      const sources = document.querySelector('.sources') as HTMLElement;
      sources.style.display = '';
    }
  }
}

export default Size;