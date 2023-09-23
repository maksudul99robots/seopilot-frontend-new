"use client";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { LoginRegistrationAPI } from "@/app/services/API";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

const RedeemCoupon = () => {
    const router = useRouter();
    const [extensionId, setExtensionId] = useState<string | null | undefined>('')

    useEffect(() => {


        if (window.location.hostname.includes("app.seopilot.io")) {
            setExtensionId(process.env.NEXT_PUBLIC_EXT_ID)
        } else {
            setExtensionId(localStorage.getItem("extension_id"));
        }

        let token = localStorage.getItem('seo-pilot-token');
        if (token) {
            let decoded: any = jwt_decode(token);
            if (decoded.plan && decoded.plan > 0) {
                Swal.fire({
                    html: '<h2>' + "You're already in <br>Rockethub LTD - CAPTAIN" + '</h2>',
                    confirmButtonText: "OK",
                    icon: "error",
                    iconColor: "#555555"

                },

                ).then(() => {
                    router.push("/")
                })
            } else {
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
                                    sendTokenToExtension(response.data.accessToken);
                                    localStorage.setItem("seo-pilot-token", response.data.accessToken);
                                    resolve('redeemed!')
                                } else {
                                    reject("api error!")
                                }
                            } catch (e: any) {
                                reject(e.response.data)
                            }

                        })
                    }
                }).then((res) => {
                    Swal.fire(
                        'Redeemed Successfully!',
                        'Close and reopen your extension to get premium features',
                        'success'
                    ).then(() => {
                        router.push("/")
                    })
                }).catch(e => {
                    Swal.fire(
                        e,
                        '',
                        'error'
                    ).then(() => {
                        router.push("/")
                    })
                })
            }
        } else {
            router.push("/login")
        }

    }, [])

    const sendTokenToExtension = (token: string) => {
        if (extensionId && extensionId.length>1) {
          // console.log("sending!!")
          chrome.runtime.sendMessage(
            // localStorage.getItem("extension_id"), // Extension ID
            extensionId,
            { action: "storeToken", token: token },
            (response) => {
              // console.log("response:", response)
              if (response && response.success) {
                // console.log("Token stored in extension's local storage.", response);
              } else {
                console.error("Failed to store token in extension.");
              }
            }
          );
        }
    
      };
    return (
        <PageContainer>
            <Box>

            </Box>

        </PageContainer>
    );
};
export default RedeemCoupon;


