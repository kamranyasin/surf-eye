import React from 'react'

const CouponItem = ({
    title,
    expiresAt,
    created_at,
    discount,
    status,
    coupentype,
    use,
  }) => {
  return (
    <>
    <div className="coupons__contents__items-item">
      <div className="coupons__contents__items-item-name">{title}</div>
      <div className="coupons__contents__items-item-discount">
        {discount}
        {/* {isFlat ? " €" : " %"} */}
      </div>
      <div className="coupons__contents__items-item-createdAt">
        {created_at}
      </div>
      <div className="coupons__contents__items-item-createdAt">{expiresAt}</div>
      <div className="coupons__contents__items-item-status" >
        {status === true ? "True" : "False"}
      </div>
      <div className="coupons__contents__items-item-status">{coupentype}</div>
      {/* <div className="coupons__contents__items-item-status" >{use}</div> */}
    </div>
    </>
  )
}

export default CouponItem

