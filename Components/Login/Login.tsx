import Image from "next/image"
import classes from './Login.module.scss'
import SideContainer from "./SideContainer";

function Login() {

    return (
        <div className={classes.main}>
            <div className={classes.mainImgContainer}>
                <Image
                    src="/main.jpg"
                    alt="Lets chat"
                    title="Lets chat"
                    layout="fill"
                    objectFit="fill"
                />
            </div>
            <SideContainer/>
        </div>
    );
}

export default Login