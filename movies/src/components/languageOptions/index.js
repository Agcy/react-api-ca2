import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <select onChange={changeLanguage} defaultValue={i18n.language}>
            <option value="en">English</option>
            <option value="zh">Chinese-Mainland</option>
            <option value="es">Español</option>
            {/* 其他支持的语言 */}
        </select>
    );
};

export default LanguageSelector;
