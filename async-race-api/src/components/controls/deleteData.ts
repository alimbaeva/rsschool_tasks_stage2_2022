class DeleteData {
  static async delete(path: string): Promise<void> {
    const res = await fetch(path, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Ошибка пути ${path}, статус ошибки: ${res}`);
    }
    window.location.reload();
  }
}

export default DeleteData;
