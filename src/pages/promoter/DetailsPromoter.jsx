import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const DetailsPromoter = () => {
     const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const { loading, error, promoter} = useSelector((state ) => state.promoter)
  return (
    <div>DetailsPromoter</div>
  )
}

export default DetailsPromoter