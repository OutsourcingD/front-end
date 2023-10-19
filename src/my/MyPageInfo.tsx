import React from "react";
import "./MyPageInfo.css";
import Footer from "../bottom/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyPageInfo() {
    const [nickname, setNickname] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [pwd, setPwd] = React.useState<string>("");
    const [pwdCheck, setPwdCheck] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");
    const [gender, setGender] = React.useState<number>(0);
    const [email, setEmail] = React.useState<string>("");
    const [isDuplicate, setIsDuplicate] = React.useState<number>(0);
    const [image, setImage] = React.useState("/person.png");
    const [prevImage, setPrevImage] = React.useState("/person.png");
    const [profileFile, setProfileFile] = React.useState<File | null>(null); // 파일 객체를 위한 상태
    const fileInput = React.useRef<HTMLInputElement | null>(null);
    const [defaultNickname, setDefaultNickname] = React.useState<string>("");
    const [defaultName, setDefaultName] = React.useState<string>("");
    const [defaultPhone, setDefaultPhone] = React.useState<string>("");
    const navigate = useNavigate();

    const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const pwdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
    };

    const pwdCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwdCheck(e.target.value);
    };

    const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handleEdit = () => {
        const formData = new FormData();

        if(profileFile !== null) formData.append("profileImg", profileFile);
        if(nickname.length !== 0) formData.append("nickname", nickname);
        if (name.length !== 0) formData.append("name", name);
        if (pwd.length !== 0 && pwd === pwdCheck)
            formData.append("password", pwd);
        if (phone.length !== 0) formData.append("phoneNumber", phone);
        if (gender === 1) {
            formData.append("gender", "false");
        } else if (gender === 2) {
            formData.append("gender", "true");
        }

        const accessToken = localStorage.getItem("access_token");

        if(accessToken) {
            axios
                .post(`${process.env.REACT_APP_SERVER_URL}/member/edit`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    localStorage.setItem("nickname", res.data.nickname);
                    alert("회원정보가 수정되었습니다.");
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
        }
        else {
          alert("not accessToken")
        }
    };

    const handleDuplicate = () => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/non-member/check-duplicated?name=${nickname}`,
        }).then((res) => {
            res.data ? setIsDuplicate(1) : setIsDuplicate(2);
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
    };

    const saveImgFile = () => {
        if (fileInput.current === null || fileInput.current.files === null) {
            setImage(prevImage); // 파일 선택이 없거나 취소된 경우 이전 사진으로 복원
            return;
        }
        const file = fileInput.current.files[0];
        const reader = new FileReader();

        if (!(file instanceof Blob)) {
            setImage(prevImage); // 파일 선택이 없거나 취소된 경우 이전 사진으로 복원
            return;
        }

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (
                fileInput.current !== null &&
                fileInput.current.files !== null &&
                typeof reader.result === "string"
            ) {
                setPrevImage(reader.result); // 현재 image 상태를 prevImage에 저장합니다.
                setImage(reader.result);

                const profile = fileInput.current.files[0];

                setProfileFile(profile);
            }
        };
    };

    React.useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/member/info`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setEmail(res.data.userId);
            setImage(res.data.profile);
            setPrevImage(res.data.profile);
            setDefaultNickname(res.data.nickname);
            setDefaultName(res.data.name);
            setDefaultPhone(res.data.phoneNumber);
            res.data.gender === null
                ? setGender(0)
                : res.data.gender === 1
                ? setGender(1)
                : setGender(2);

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

    React.useEffect(() => {
        console.log("profile file: ", profileFile)
    }, [profileFile]);

    return (
        <div className="mypage_info_div">
            <div className="mypage_info_wrapper">
                {/* 이름 */}
                <div className="mypage_info_name_div">
                    <p id="mypage_name">{defaultNickname}</p>
                </div>
                {/* 프로필 이미지 입력 */}
                <div className="mypage_info_signup_input_div">
                    <img src="/camera.png" alt="" id="camera_img" />
                    <img
                        src={image}
                        alt="profile"
                        id="profile_input_img"
                        onClick={() => {
                            fileInput.current?.click();
                        }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        id="signup_input"
                        name="profile"
                        style={{ display: "none" }}
                        onChange={saveImgFile}
                        ref={fileInput}
                    ></input>
                </div>
                <div className="mypage_info_body">
                    <div className="my_info_sub_title_div">
                        <div className="my_info_nickname_container">
                            <p id="my_info_sub_title">Nickname</p>
                            {isDuplicate === 2 ? (
                                <p id="check_nickname_result_ok">
                                    available nickname.
                                </p>
                            ) : null}
                            {isDuplicate === 1 ? (
                                <p id="check_nickname_result_false">
                                    unavailable nickname.
                                </p>
                            ) : null}
                        </div>
                        <div className="nickname_div">
                            <form
                                id="form_nickname"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <input
                                    id="input_tag"
                                    type="text"
                                    value={nickname}
                                    placeholder={defaultNickname}
                                    onChange={nicknameHandler}
                                />
                            </form>
                            <div
                                className={
                                    nickname.length < 2
                                        ? "check_nickname"
                                        : "check_nickname_active"
                                }
                                onClick={handleDuplicate}
                            >
                                <p
                                    id={
                                        nickname.length < 2
                                            ? "check_nickname"
                                            : "check_nickname_active"
                                    }
                                >
                                    check
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="my_info_sub_title_div">
                        <p id="my_info_sub_title_name">Name</p>
                        <form
                            id="form_tag"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                id="input_tag"
                                value={name}
                                type="text"
                                placeholder={
                                    defaultName.length === 0
                                        ? "Enter a name."
                                        : defaultName
                                }
                                onChange={nameHandler}
                            />
                        </form>
                    </div>
                    <div className="my_info_sub_title_div">
                        <p id="my_info_sub_title_name">Email</p>
                        <form
                            id="form_tag"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                disabled
                                id="input_tag"
                                type="email"
                                placeholder={email}
                            />
                        </form>
                    </div>
                    <div className="my_info_sub_title_div">
                        <div className="my_info_password_container">
                            <p id="my_info_sub_title_password_name">
                                New Password
                            </p>
                            {pwd.length > 16 ? (
                                <p id="check_nickname_result_false">
                                    too long password.
                                </p>
                            ) : null}
                            {pwd.length < 8 && pwd.length > 0 ? (
                                <p id="check_nickname_result_false">
                                    too short password.
                                </p>
                            ) : null}
                        </div>
                        <form
                            id="form_tag"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                id="input_tag"
                                type="password"
                                value={pwd}
                                placeholder="Enter a password between 8 and 16 characters."
                                onChange={pwdHandler}
                            />
                        </form>
                    </div>
                    <div className="my_info_sub_title_div">
                        <div className="my_info_password_container">
                            <p id="my_info_sub_title_password_name">
                                Password Check
                            </p>
                            {pwdCheck.length === 0 ? null : pwd !== pwdCheck ? (
                                <p id="check_nickname_result_false">
                                    Password mismatch.
                                </p>
                            ) : null}
                        </div>
                        <form
                            id="form_tag"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                id="input_tag"
                                type="password"
                                value={pwdCheck}
                                placeholder="비밀번호를 다시 입력해주세요."
                                onChange={pwdCheckHandler}
                            />
                        </form>
                    </div>
                    <div className="my_info_sub_title_div">
                        <p id="my_info_sub_title_name">Phone Number</p>
                        <form
                            id="form_tag"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                id="input_tag"
                                type="text"
                                value={phone}
                                placeholder={
                                    defaultPhone.length === 0
                                        ? "Enter a phone number."
                                        : defaultPhone
                                }
                                onChange={phoneHandler}
                            />
                        </form>
                    </div>
                    <div className="my_info_sub_title_div">
                        <p id="my_info_sub_title_name">Gender</p>
                        <div className="gender_button">
                            {gender === 1 ? (
                                <img
                                    id="man_button"
                                    src="/male_pupple.png"
                                    alt="man"
                                    onClick={() => setGender(0)}
                                />
                            ) : (
                                <img
                                    id="man_button"
                                    src="/male.png"
                                    alt="man"
                                    onClick={() => setGender(1)}
                                />
                            )}
                            {gender === 2 ? (
                                <img
                                    id="man_button"
                                    src="/female_pupple.png"
                                    alt="man"
                                    onClick={() => setGender(0)}
                                />
                            ) : (
                                <img
                                    id="woman_button"
                                    src="/female.png"
                                    alt="woman"
                                    onClick={() => setGender(2)}
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className="mypage_info_edit_button_div"
                        onClick={handleEdit}
                    >
                        <p id="mypage_info_edit_button_text">edit</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyPageInfo;
