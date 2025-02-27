import React from 'react';
import classNames from 'classnames';
import styles from './toolbar.less';

interface ToolbarProps {
    onNew: () => void;
    onSave: () => void;
    disabled: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onNew, onSave, disabled }) => {
    return (
        <div className={styles.toolbar}>
            <div className={styles.brand}>
                <h1>Dooring-EduMD | 教育版</h1>
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.button}
                    onClick={onNew}
                >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    新建文档
                </button>

                <button
                    className={classNames(styles.button, styles.primary)}
                    onClick={onSave}
                    disabled={disabled}
                >
                    保存
                </button>
                <button
                    className={classNames(styles.button)}
                >
                    <a href="https://flowmix.turntip.cn" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.27em" height="1em" viewBox="0 0 256 203">
                            <path fill="#E55CFF" d="M0 202.999h50.731V.007H0z"/>
                            <path fill="#24235C" d="M102.633.007L0 202.999h50.731L153.364.007z"/>
                            <path fill="#E55CFF" d="M102.633 202.999h50.731V.007h-50.731z"/>
                            <path fill="#24235C" d="M205.27.008L102.635 203h50.73L256 .008z"/>
                            <path fill="#E55CFF" d="M204.982 202.999h50.731V.007h-50.731z"/>
                        </svg>
                         多模态文档
                    </a>

                </button>
                <button
                    className={classNames(styles.button)}
                >
                    <a href="https://dooring.vip" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                            <g fill="none">
                                <rect width="256" height="256" fill="#E14E1D" rx="60"/>
                                <path fill="#fff"
                                      d="m48 38l8.61 96.593h110.71l-3.715 41.43l-35.646 9.638l-35.579-9.624l-2.379-26.602H57.94l4.585 51.281l65.427 18.172l65.51-18.172l8.783-98.061H85.824l-2.923-32.71h122.238L208 38z"/>
                                <path fill="#EBEBEB"
                                      d="M128 38H48l8.61 96.593H128v-31.938H85.824l-2.923-32.71H128zm0 147.647l-.041.014l-35.579-9.624l-2.379-26.602H57.94l4.585 51.281l65.427 18.172l.049-.014z"/>
                            </g>
                        </svg>
                        页面制作
                    </a>

                </button>
            </div>
        </div>
    );
};