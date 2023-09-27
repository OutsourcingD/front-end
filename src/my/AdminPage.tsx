import React, { useEffect } from "react";
import "./AdminPage.css";
import SideMenu from "../components/SideMenu";
import BannerManagementPage from "../components/BannerManagementPage";
import ChangeReview from "../components/ChangeReview";
import DoctorEdit from "../components/DoctorEdit";
import DoctorAdd from "../components/DoctorAdd";
import CheckUserIp from "../components/CheckUserIp";
import CheckUser from "../components/CheckUser";
import AddAdminId from "../components/AddAdminId";
import InqueryManagement from "../components/InqueryManagement";
import EtcReviewManagement from "../components/EtcReviewManagement";
import Footer from "../bottom/Footer";

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
    ];

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
