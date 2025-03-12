import { useState, useEffect } from "react";
import Button from './Button';
import FieldCurrency from './FieldCurrency';
import CurrencyInput from 'react-currency-input-field';
import SelectField from "./SelectField";
import useStore from "../stores/store";
import { ChevronLeft, ChevronRight, House } from 'lucide-react';

export default function UserFinanceForm({ heading, __currentPathId, __currentQuestionId, fields, onUpdate, viewOnly = false }) {
  const { quizData, setCurrentPathId, setCurrentQuestionId, ...rest } = useStore();
  const [point, setPoint ] = useState(0);
  const [userFinance, setUserFinance] = useState(fields)
  // useState({
  //   'thu_nhap_chinh': 0,
  //   'thu_nhap_phu': 0,
  //   'thu_nhap_on_dinh': 0, // 0 - 5
    
  //   'chi_phi_co_dinh_hang_thang': 0,
  //   'chi_phi_linh_hoat_hang_thang': 0,
  //   'ty_le_tiet_kem_theo_phan_tram_thu_nhap': 0, // 0 - 100

  //   'tai_san_tien_mat': 0,
  //   'tai_san_bds': 0,
  //   'tai_san_dau_tu_truyen_thong': 0,
  //   'tai_san_crypto': 0,
  //   'quy_du_phong': 0,

  //   'tong_du_no': 0,
  //   'chi_phi_tra_no_hang_thang': 0,
  //   'thoi_han_no_con_lai': 0,
  // })

  const onUpdatePoint = () => {
    let __point = 0;
    let num = 1000000;

    let total_thu_nhap_chinh_phu = parseFloat(userFinance.thu_nhap_chinh || 0) + parseFloat(userFinance.thu_nhap_phu || 0);
    
    if(total_thu_nhap_chinh_phu >= (30 * num)) {
      __point += 2;
    } else if(total_thu_nhap_chinh_phu >= (20 * num)) {
      __point += 1;
    }

    if(userFinance.ty_le_tiet_kem_theo_phan_tram_thu_nhap >= 30) {
      __point += 2
    } else if(userFinance.ty_le_tiet_kem_theo_phan_tram_thu_nhap >= 20) {
      __point += 1;
    }

    if(userFinance.quy_du_phong >= 6) {
      __point += 2;
    } else if(userFinance.quy_du_phong >= 3) {
      __point += 1;
    }

    if(userFinance.tong_du_no == 0) {
      __point += 2;
    } else {
       if(((userFinance.chi_phi_tra_no_hang_thang / total_thu_nhap_chinh_phu) * 100) <= 30) {
        __point += 1;
      }
    }

    let multiple_assets = [
      userFinance.tai_san_tien_mat > 0 ? 1 : 0,
      userFinance.tai_san_bds > 0 ? 1 : 0,
      userFinance.tai_san_dau_tu_truyen_thong > 0 ? 1 : 0,
      userFinance.tai_san_crypto > 0 ? 1 : 0,
    ]

    if(multiple_assets.filter(i => i == 1).length >= 3) {
      __point += 2;
    } else if(multiple_assets.filter(i => i == 1).length >= 2) {
      __point += 1;
    }

    setPoint(__point);
    (onUpdate ? onUpdate(userFinance, __point) : '')
  }

  useEffect(() => {
    onUpdatePoint()
  }, [userFinance])

  const currentPath = quizData.find(q => q.id === __currentPathId);
  const currentQuestionIndex = currentPath.questions.findIndex(q => q.id === __currentQuestionId);
  const nextQuestionId = currentPath.questions[currentQuestionIndex + 1]?.id;
  const prevQuestionId = currentPath.questions[currentQuestionIndex - 1]?.id;

  const onNext = () => {
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
    }
  }

  const onPrev = () => {
    if (prevQuestionId) {
      setCurrentQuestionId(prevQuestionId);
    }
  }

  return <>
    {/* { point } */}
    <form className="a-quiz-form" onSubmit={ e => { e.preventDefault() } }>
      

      <div className="user-finance-form">
        {
          heading && <>
            <h4>{ heading }</h4>
            <hr style={{ margin: `1em 0` }} />
          </>
        }
        <strong>Thông tin thu nhập:</strong>
        <div className="user-finance-form__item">
          <label htmlFor="thu_nhap_chinh">Thu nhập chính</label>
          <CurrencyInput
            suffix="₫" 
            defaultValue={userFinance.thu_nhap_chinh}
            readOnly={ viewOnly }
            onValueChange={(value) => {
              // console.log(value);
              setUserFinance({...userFinance, thu_nhap_chinh: parseFloat(value || 0)})
            }}
          />
        </div>
        <div className="user-finance-form__item">
          <label htmlFor="thu_nhap_phu">Thu nhập phụ</label>
          <CurrencyInput 
            suffix="₫"
            readOnly={ viewOnly }
            defaultValue={userFinance.thu_nhap_phu}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, thu_nhap_phu: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="thu_nhap_phu" name="thu_nhap_phu" value={userFinance.thu_nhap_phu} onChange={(e) => setUserFinance({...userFinance, thu_nhap_phu: e.target.value})} /> */}
        </div>
        <div className="user-finance-form__item">
          <label htmlFor="thu_nhap_on_dinh">Thu nhập ổn định</label>
          <SelectField
            readOnly={ viewOnly }
            // label="Thu nhập ổn định"
            options={[
              {value: 0, label: 'Mức 0 (không ổn định)'},
              {value: 1, label: 'Mức 1 (đang giảm)'},
              {value: 2, label: 'Mức 2 (đang ổn định)'},
              {value: 3, label: 'Mức 3 (đang tăng)'},
              {value: 4, label: 'Mức 4 (ổn định)'},
              {value: 5, label: 'Mức 5 (cự kỳ ổn định)'},
            ]}
            value={userFinance.thu_nhap_on_dinh}
            onChange={(e) => setUserFinance({...userFinance, thu_nhap_on_dinh: e.target.value})}
          />
          {/* <input type="number" id="thu_nhap_on_dinh" name="thu_nhap_on_dinh" value={userFinance.thu_nhap_on_dinh} onChange={(e) => setUserFinance({...userFinance, thu_nhap_on_dinh: e.target.value})} /> */}
        </div>

        <strong>Chi tiêu:</strong>
        <div className="user-finance-form__item">
          <label htmlFor="chi_phi_co_dinh_hang_thang">Chi phí cố định hàng tháng</label>
          <CurrencyInput 
            suffix="₫"
            readOnly={ viewOnly }
            defaultValue={userFinance.chi_phi_co_dinh_hang_thang}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, chi_phi_co_dinh_hang_thang: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="chi_phi_co_dinh_hang_thang" name="chi_phi_co_dinh_hang_thang" value={userFinance.chi_phi_co_dinh_hang_thang} onChange={(e) => setUserFinance({...userFinance, chi_phi_co_dinh_hang_thang: e.target.value})} /> */}
        </div>
        <div className="user-finance-form__item">
          <label htmlFor="chi_phi_linh_hoat_hang_thang">Chi phí linh hoạt hàng tháng</label>
          <CurrencyInput
            suffix="₫"
            readOnly={ viewOnly }
            defaultValue={userFinance.chi_phi_linh_hoat_hang_thang}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, chi_phi_linh_hoat_hang_thang: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="chi_phi_linh_hoat_hang_thang" name="chi_phi_linh_hoat_hang_thang" value={userFinance.chi_phi_linh_hoat_hang_thang} onChange={(e) => setUserFinance({...userFinance, chi_phi_linh_hoat_hang_thang: e.target.value})} /> */}
        </div>
        <div className="user-finance-form__item">
          <label htmlFor="ty_le_tiet_kem_theo_phan_tram_thu_nhap">Tỷ lệ tiết kiệm theo phần trăm thu nhập</label>
          <CurrencyInput
            suffix=" (%)"
            readOnly={ viewOnly }
            maxLength={2}
            defaultValue={userFinance.ty_le_tiet_kem_theo_phan_tram_thu_nhap}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, ty_le_tiet_kem_theo_phan_tram_thu_nhap: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="ty_le_tiet_kem_theo_phan_tram_thu_nhap" name="chi_phi_linh_hoat_hang_thang" value={userFinance.ty_le_tiet_kem_theo_phan_tram_thu_nhap} onChange={(e) => setUserFinance({...userFinance, ty_le_tiet_kem_theo_phan_tram_thu_nhap: e.target.value})} /> */}
        </div>
        
        <strong>Tài sản:</strong>
        <div className="user-finance-form__item">
          <label htmlFor="tai_san_tien_mat">Tài sản tiền mặt</label>
          <CurrencyInput
            suffix="₫"
            readOnly={ viewOnly }
            defaultValue={userFinance.tai_san_tien_mat}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, tai_san_tien_mat: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="tai_san_tien_mat" name="tai_san_tien_mat" value={userFinance.tai_san_tien_mat} onChange={(e) => setUserFinance({...userFinance, tai_san_tien_mat: e.target.value})} /> */}
        </div>
        <div className="user-finance-form__item">
          <label htmlFor="tai_san_bds">Tài sản BDS</label>
          <CurrencyInput
            suffix="₫"
            readOnly={ viewOnly }
            defaultValue={userFinance.tai_san_bds}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, tai_san_bds: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="tai_san_bds" name="tai_san_bds" value={userFinance.tai_san_bds} onChange={(e) => setUserFinance({...userFinance, tai_san_bds: e.target.value})} /> */}
        </div>
        <div className="user-finance-form__item">
          <label htmlFor="tai_san_dau_tu_truyen_thong">Tài sản đầu tư truyền thống</label>
          <CurrencyInput 
            suffix="₫"
            readOnly={ viewOnly }
            defaultValue={userFinance.tai_san_dau_tu_truyen_thong}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, tai_san_dau_tu_truyen_thong: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="tai_san_dau_tu_truyen_thong" name="tai_san_dau_tu_truyen_thong" value={userFinance.tai_san_dau_tu_truyen_thong} onChange={(e) => setUserFinance({...userFinance, tai_san_dau_tu_truyen_thong: e.target.value})} /> */}
        </div>
        <div className="user-finance-form__item">
          <label htmlFor="tai_san_crypto">Tài sản Crypto</label>
          <CurrencyInput
            suffix="₫"
            readOnly={ viewOnly }
            defaultValue={userFinance.tai_san_crypto}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, tai_san_crypto: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="tai_san_crypto" name="tai_san_crypto" value={userFinance.tai_san_crypto} onChange={(e) => setUserFinance({...userFinance, tai_san_crypto: e.target.value})} /> */}
        </div>
        <div className="user-finance-form__item">
          <label htmlFor="quy_du_phong">Quỹ dự phòng</label>
          <CurrencyInput
            suffix=" (tháng)"
            readOnly={ viewOnly }
            defaultValue={userFinance.quy_du_phong}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, quy_du_phong: parseFloat(value || 0)})
            }}
          />
        </div>

        <strong>Nợ và nghĩa vụ tài chính:</strong>
        <div className="user-finance-form__item">
          <label htmlFor="tong_du_no">Tổng dư nợ</label>
          <CurrencyInput 
            suffix="₫"
            readOnly={ viewOnly }
            defaultValue={userFinance.tong_du_no}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, tong_du_no: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="tong_du_no" name="tong_du_no" value={userFinance.tong_du_no} onChange={(e) => setUserFinance({...userFinance, tong_du_no: e.target.value})} /> */}
        </div>
        <div className="user-finance-form__item">
          <label htmlFor="chi_phi_tra_no_hang_thang">Chi phí trả nợ hàng tháng</label>
          <CurrencyInput
            suffix="₫"
            readOnly={ viewOnly }
            defaultValue={userFinance.chi_phi_tra_no_hang_thang}
            onValueChange={(value) => {
              console.log(value);
              setUserFinance({...userFinance, chi_phi_tra_no_hang_thang: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="chi_phi_tra_no_hang_thang" name="chi_phi_tra_no_hang_thang" value={userFinance.chi_phi_tra_no_hang_thang} onChange={(e) => setUserFinance({...userFinance, chi_phi_tra_no_hang_thang: e.target.value})} /> */}
        </div>
        <div className="user-finance-form__item">
          <label htmlFor="thoi_han_no_con_lai">Thời hạn nợ còn lại</label>
          <CurrencyInput
            suffix=" (tháng)" 
            readOnly={ viewOnly }
            defaultValue={userFinance.thoi_han_no_con_lai}
            onValueChange={(value) => {
              // console.log(value);
              setUserFinance({...userFinance, thoi_han_no_con_lai: parseFloat(value || 0)})
            }}
          />
          {/* <input type="number" id="thoi_han_no_con_lai" name="thoi_han_no_con_lai" value={userFinance.thoi_han_no_con_lai} onChange={(e) => setUserFinance({...userFinance, thoi_han_no_con_lai: e.target.value})} /> */}
        </div>
      </div>
      {/* <Button type="submit">Submit</Button> */}
    </form>

    {
      viewOnly != true ? (
        <div className="questions-actions">
          <Button disabled={ (prevQuestionId ? false : true) } variant="outline" onClick={ onPrev }><ChevronLeft /> Trở lại</Button>
          <Button onClick={ e => {
            e.preventDefault();
            setCurrentPathId(null)
          } }><House /></Button>
          <Button variant="primary" onClick={ (e) => {
            e.preventDefault();

            if(nextQuestionId) {
              onNext()
            } else {
              onFinish()
            }
          } }>
            {
              nextQuestionId ? (<>Tiếp tục <ChevronRight/></>) : 'Hoàn thành'
            }
          </Button>
        </div>
      ) : ''
    }
  </>
}