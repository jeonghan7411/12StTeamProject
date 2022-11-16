import React from "react";

import classes from "./OrderDeliveryInfo.module.css";

const OrderDeliveryInfo = ({ userData, onShowModal }) => {
  return (
    <div className={classes["orderDeliveryInfo"]}>
      <div className={classes["orderDeliveryInfo-deliveryChange"]}>
        <h4>받는 사람 정보</h4>
        <button
          onClick={() =>
            onShowModal((prev) => {
              return { ...prev, isShowDeliveryInfo: true };
            })
          }
        >
          배송지 정보 변경
        </button>
      </div>

      <table className={classes["orderDeliveryInfo-table"]}>
        <tbody>
          <tr>
            <td className={classes["orderDeliveryInfo-table__col1"]}>이름</td>
            <td className={classes["orderDeliveryInfo-table__col2"]}>
              {userData.uName}
            </td>
          </tr>
          <tr>
            <td className={classes["orderDeliveryInfo-table__col1"]}>
              배송지 주소
            </td>
            <td className={classes["orderDeliveryInfo-table__col2"]}>
              {`${userData.uAddress} [ ${userData.uZipcode} ] ${userData.uAdditionalAddr}`}
            </td>
            <button></button>
          </tr>
          <tr>
            <td className={classes["orderDeliveryInfo-table__col1"]}>연락처</td>
            <td className={classes["orderDeliveryInfo-table__col2"]}>
              {userData.uPhone}
            </td>
          </tr>
          <tr>
            <td className={classes["orderDeliveryInfo-table__col1"]}>
              배송요청사항
            </td>
            <td className={classes["orderDeliveryInfo-table__memo"]}>
              <span></span>

              <button
                className={classes["orderDeliveryInfo-table__changeMemo"]}
                onClick={() =>
                  onShowModal((prev) => {
                    return { ...prev, isShowDeliveryMemo: true };
                  })
                }
              >
                요청사항 수정
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderDeliveryInfo;
