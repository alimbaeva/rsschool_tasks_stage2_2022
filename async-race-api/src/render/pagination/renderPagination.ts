import Pagination from './pagination';

class RenderPagination {
  static render(text: string, arr: string[]): void {
    if (document.querySelector('.pagination')) {
      const paginationCl = document.querySelector('.pagination') as HTMLElement;
      paginationCl.parentNode?.removeChild(paginationCl);
    }
    const body = document.querySelector('body') as HTMLElement;
    const blockPagination = document.createElement('section') as HTMLElement;
    blockPagination.setAttribute('class', 'pagination');
    blockPagination.innerHTML = Pagination.render(text, arr);
    body.prepend(blockPagination);
  }
}

export default RenderPagination;
