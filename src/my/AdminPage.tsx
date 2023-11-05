import React, { useEffect } from "react";
import "./AdminPage.css";
import SideMenu from "../components/SideMenu";
import BannerManagementPage from "../components/BannerManagementPage";
import ChangeReview from "../components/ChangeReview";
import DoctorEdit from "../components/DoctorEdit";
import DoctorAdd from "../components/DoctorHospitalAdd";
import CheckUserIp from "../components/CheckUserIp";
import CheckUser from "../components/CheckUser";
import AddAdminId from "../components/AddAdminId";
import InqueryManagement from "../components/InqueryManagement";
import EtcReviewManagement from "../components/EtcReviewManagement";
import Footer from "../bottom/Footer";
import DeleteMember from "../components/DeleteMember";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
    authorityName: string;
    role: string;
}

function AdminPage() {
    const [menu, setMenu] = React.useState(0);
    const MENU_COMPONENTS = [
        <BannerManagementPage />,
        <ChangeReview />,
        <DoctorEdit />,
        <DoctorAdd />,
        <CheckUserIp />,
        <CheckUser />,
        <AddAdminId />,
        <InqueryManagement />,
        <EtcReviewManagement />,
        <DeleteMember />,
    ];
    const navigate = useNavigate();
    
    React.useEffect(() => {
        axios({
            method: "get",
            url: `/api/auth/check`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },  
        }).then((res) => {
            let admin = false;

            console.log(res.data);

            res.data.map((item: Props) => {
                if (item.authorityName !== "ROLE_ADMIN") {
                    console.log("관리자가 아닙니다.")
                    admin = true;
                }
            });

            if(!admin)
                navigate("/");
        }).catch((err) => {  
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/");
            }        
        });
    }, []);

    const onClickMenu = (menu: number) => {
        setMenu(menu);
    };

    return (
        <>
        <div className="admin_page_div">
            <SideMenu menuHandler={onClickMenu} />
            <div className="admin_page_main_div">
                {MENU_COMPONENTS[menu]}
            </div>
        </div>
        <Footer />
        </>
    );
}

export default AdminPage;
