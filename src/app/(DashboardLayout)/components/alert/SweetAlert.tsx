import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/app/GlobalRedux/store';
import { useEffect } from 'react';
import { setAlert } from '@/app/GlobalRedux/Features/Alert/alertSlice';

const SweetAlert = ({ children }: { children: React.ReactNode }) => {
    const alert = useSelector((state: RootState) => state.alert);
    const dispatch = useDispatch();
    useEffect(() => {
        if (alert?.text?.length > 1 && alert?.title?.length > 1)
            Swal.fire({
                icon: alert.icon,
                title: alert.title,
                text: alert.text,
                showCancelButton: alert.showCancelButton,
            }).then((result)=>{
                dispatch(setAlert({title:"Success", icon:'', text:""}))
            })
    }, [alert])

    return <>
        {children}
    </>
}

export default SweetAlert

