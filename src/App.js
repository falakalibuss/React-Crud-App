import React, { useState } from "react";
import BookCard from "./components/BookCard";
import { ADD_TYPE } from "./components/buttonTypes";
import CustomButton from "./components/CustomButton";

const App = () => {
  //İnputun içindeki veriyi tutacak state(objeye aktarılacak kitap ismi burada tutulacak)
  const [bookName, setBookName] = useState("");
  //tüm kitapların tutulduğu dizi

  const [bookList, setBookList] = useState([]);

  //console.log(inputText)
  //Kitap ekleme işlemi
  const addBook = (e) => {
    e.preventDefault();
    //console.log('fonksiyon çalıştı')

    //Yeni kitap objelerini tutan bir obje oluşturulması
    const newBook = {
      id: new Date().getTime(),
      bookTitle: bookName,
      date: new Date().toLocaleString(),
      isRead: "false",
    };
    //spread operator(...) neyin devamını almak istiyorsak onu yazıyoruz

    setBookList([...bookList, newBook]);

    //Ekle butonuna basınca inputu temizler
    setBookName("");
  };
  //sil butonuna basılınca çalışacak fonksiyon

  const handleDelete = (deleteId) => {
    //kitap listesi filter metodu ile dönülür ve istenilen değer eşit olmayan elemenalar yeni değişkene atanır
    const filteredList = bookList.filter((book) => book.id !== deleteId);

    //Kitap Listesi bu yeni değişken ile güncellenir
    setBookList(filteredList);
  };
  //okundu butonuna basılınca
  //1-okundu değerini tersine çevir
  //2-bookList dizisinin bir kopyasını oluştur
  //düzenlenecek olan dizi elemanının indexini tespit etme
  //4-eski kitabı diziden çıkar yerine yeni kitabı ekle
  //5-Güncel kopya diziyi statee aktar

  const handleReadChange = (book) => {
    //1.işlem
    const updatedBook = { ...book, isRead: !book.isRead };

    //dizixdeki değişmeyen eski elemanını tespit etme adımları

    const cloneBookList = [...bookList];

    const bookIndex = cloneBookList.findIndex((item) => item.id === book.id);
    cloneBookList.splice(bookIndex, 1, updatedBook);

    setBookList(cloneBookList);
  };

  //console.log(bookList);
  return (
    <div>
      <header className="bg-dark text-light py-2 text-center fs-5">
        Kitap Kurdu
      </header>

      <div className="container border">
        {/*Kitap ekleme formu*/}
        <form className="d-flex gap-3 mt-4" onSubmit={addBook}>
          <input
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Kitap Adı Giriniz"
            className="form-control shadow"
          />
          <CustomButton type={ADD_TYPE} title={"Ekle"} />
        </form>
        {/*Kitap ekleme formu*/}

        {/*Kitapları gösteren yapı*/}
        <div className="d-flex flex-column gap-5 mt-3 shadow">
          {bookList.length === 0 ? (
            <p> Henüz herhangi bir kitap eklenmedi</p>
          ) : (
            bookList.map((book) => {
              //console.log('kitap', book)
              return (
                <BookCard
                  readUpdateClick={() => handleReadChange(book)}
                  deleteClick={() => handleDelete(book.id)}
                  bookInfo={book}
                />
              );
            })
          )}
        </div>
        {/*Kitapları gösteren yapı bitiş*/}
      </div>
    </div>
  );
};
export default App;
