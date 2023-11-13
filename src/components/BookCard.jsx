import { DELETE_TYPE, EDIT_TYPE, READ_TYPE } from "./buttonTypes";
import CustomButton from "./CustomButton";

const BookCard = ({bookInfo,deleteClick,readUpdateClick}) => {
  //console.log("BookCard", bookInfo);
  return (
    //En dış kapsayıcı
    <div className="d-flex justify-content-between align-items-center border p-3">
        {/*Sol taraf isim ve tarih bilgisi */}
        <div>
            <h5
            style={{textDecoration:bookInfo.isRead? 'line-through':'none'}}>{bookInfo.bookTitle}</h5>
            <p>{bookInfo.date}</p>
        </div>
         {/*Sağ taraf butonların bulunduğu alan */}
         <div className="btn-group">
            <CustomButton title={'Sil'} type={DELETE_TYPE} onClick={deleteClick}/>
            <CustomButton title={'Düzenle'} type={EDIT_TYPE} />
            <CustomButton title={bookInfo.isRead===false? 'Okunmadı':'Okundu'} type={READ_TYPE} onClick={readUpdateClick}/>

         </div>

      
    </div>
  );
};

export default BookCard;
