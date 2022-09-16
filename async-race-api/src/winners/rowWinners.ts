class RowWinners {
  static create(number: string, car: string, name: string, wins: string, time: string): string {
    return `
      <div class="winners-row">
        <p>${number}</p>
        <p>${car}</p>
        <p>${name}</p>
        <p>${wins}</p>
        <p>${time}</p>
      </div>
    `;
  }
}

export default RowWinners;
