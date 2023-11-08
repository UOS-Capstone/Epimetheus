import React, { useContext } from 'react';
import CodeInputComponent, {
    CodeInputProps,
} from '../components/CodeInputComponent';
import { useState, useEffect, useRef } from 'react';
import LanguageSelectComponent from '../components/LanguageSelectComponent';
import { HiChevronDown } from 'react-icons/hi';
import { HiChevronDoubleRight } from 'react-icons/hi2';
import SubTaskComponent from '../components/SubTaskComponent';
import {
    CodeInputP,
    CodeInput,
    CodeInputLayer,
    SwitchButton,
    SubmitButton,
    SubtaskDiv,
} from '../styles/CodeInputPage.styles';
import { StateContext } from '../App';
import { useSearchParams } from 'react-router-dom';

export default function CodeInputPage() {
    const [lang, setLanguage] = useState<string>('python');
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const targetRef = useRef<number>(0);

    const {
        isLoading,
        title,
        description,
        code,
        openCode
    } = useContext(StateContext);

    const [serchParams] = useSearchParams();

    const stepId = useRef<string>(' ');
    if(serchParams.get('info') === null) {
        stepId.current = ' ';
    } else {
        stepId.current = serchParams.get('info') as string;
    }
    const [codeText, setCode] = useState<string>(code[stepId.current][0] || '');

    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };
    useEffect(() => {
        //bring code
        //brinng tasks
        const timer = setInterval(() => {
            window.addEventListener('scroll', handleScroll);
        }, 1000);
        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > targetRef.current) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        targetRef.current = window.scrollY;
    };
    const toBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(codeText);
        console.log(lang);
    };
    return (
        <CodeInputP>
            <SwitchButton
                isVisible={isVisible}
                position={targetRef.current}
                onClick={toBottom}
            >
                <HiChevronDown />
            </SwitchButton>
            <CodeInputLayer>
                <SubtaskDiv>
                    <SubTaskComponent title={title[stepId.current]} description={description[stepId.current]} isLoading={isLoading[stepId.current]} handleCode={true} />
                </SubtaskDiv>
                <LanguageSelectComponent onChange={onSelect} />
                <CodeInput>
                    <CodeInputComponent language={lang} code={codeText} setCode={setCode} />
                </CodeInput>
                <SubmitButton onClick={onSubmit}>
                    <HiChevronDoubleRight />
                </SubmitButton>
            </CodeInputLayer>
        </CodeInputP>
    );
}
