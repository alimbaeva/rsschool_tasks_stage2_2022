class Pagination {
  static render(text: string, arr:string[]): string {
    return `
      <p>${text}  ${arr[0]}- cars</p>
      <p>Page #${arr[1]}</p>
    `;
  }
}

export default Pagination;
