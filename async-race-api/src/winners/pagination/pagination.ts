import RenderPagination from '../../render/pagination/renderPagination';

class PaginationWin {
  static render(): void {
    RenderPagination.render('winner', ['10', '1']);
  }
}

export default PaginationWin;
