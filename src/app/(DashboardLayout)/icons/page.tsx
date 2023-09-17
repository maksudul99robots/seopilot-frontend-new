'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { RootState } from '@/app/GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/app/GlobalRedux/Features/Counter/counterSlice';
import { useEffect } from 'react';


const Icons = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  useEffect(()=>{
    // console.log("count:", count)
  },[count])
  return (
    <PageContainer title="Icons" description="this is Icons">

      <DashboardCard title="Icons">
        <>
          <iframe src="https://tabler-icons.io/" title="Inline Frame Example" frameBorder={0}
            width="100%"
            height="650"></iframe>
          {/* <label>{count}</label>
          <button onClick={e=>dispatch(increment())}>Increment</button>
          <button>Decrement</button>
          <button>Increment By 10</button> */}
        </>

      </DashboardCard>
    </PageContainer>
  );
};

export default Icons;
