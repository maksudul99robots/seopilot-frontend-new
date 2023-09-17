"use client";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { LoginRegistrationAPI } from "@/app/services/API";
import { Box } from "@mui/material";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


const RedeemCoupon = () => {
    const router = useRouter();
    useEffect(() => {
        Swal.fire({
            title: 'Please Enter LTD Coupon',
            icon: 'info',
            input: 'text',
            confirmButtonText: "Redeem",
            // inputLabel: 'Settings > Extensions > Copy SEOPilot Extension ID.',
            inputValue: "",
            loaderHtml: '<div class="spinner-border text-primary"></div>',
            inputValidator: (value) => {
                if (!value) {
                    return 'Invalid Coupon code'
                }
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            preConfirm: async (r) => {
                Swal.showLoading();
                return new Promise(async (resolve, reject) => {
                    try {
                        let response = await LoginRegistrationAPI.redeemCouponCode({ coupon: r });
                        if (response.status == 200) {
                            resolve('redeemed!')
                        } else {
                            reject("api error!")
                        }
                    }catch(e:any){
                        reject(e.response.data)
                    }
                    
                })
            }
        }).then((res) => {
            Swal.fire(
                'Redeemed Successfully!',
                'Close and reopen your extension to get premium features',
                'success'
            ).then(()=>{
                router.push("/")
            })
        }).catch(e => {
            Swal.fire(
                e,
                '',
                'error'
            ).then(()=>{
                router.push("/")
            })
        })
    }, [])
    return (
        <PageContainer>
            <Box>

            </Box>

        </PageContainer>
    );
};
export default RedeemCoupon;
