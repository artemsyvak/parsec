import { MouseEventHandler } from 'react';
import styles from './Button.module.scss';

interface ButtonProps{
    icon?: string,
    label: string
    size?: 'sm' | 'md' | 'lg',
    onClick: () => void,
    style: any
}

const Button = ({
    icon,
    label,
    size = 'md',
    onClick,
    style
}: ButtonProps) => {

    return(
        <button 
            className={`${styles.button} ${size}`} 
            style={style} 
            onClick={onClick}>
                <img src={icon}/>
                {label}           
        </button>
    )
}

export default Button;
