const getBooks = async (text, startIndex) => {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}&inauthor=${text}&intitle=${text}&startIndex=${startIndex}&maxResults=40`);
    const body = await res.json();
    return body;
}

export default getBooks;