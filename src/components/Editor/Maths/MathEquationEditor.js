import React, {
forwardRef, useState, useRef, useImperativeHandle, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
import {
    TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

import MathEquationEditorButton from '../../Button/Maths/Button';
import { InlineMath } from 'react-katex';

import * as greekSymbols from './Operators/greekSymbols';
import * as simpleOperators from './Operators/simpleOperators';
import * as relationOperators from './Operators/relationOperators';
import * as equalityOperators from './Operators/equalityOperators';
import * as setOperators from './Operators/setOperators';
import * as trignometricOperators from './Operators/trignometricOperators';
import * as logicNotations from './Operators/logicNotations';
import * as geometryNotations from './Operators/geometryNotations';
import * as delemiters from './Operators/delemiters';
import * as functions from './Operators/functions';


import './MathEquationEditor.css';

addMathquillStyles();

const MathEquationEditor = forwardRef((props, ref) => {
    const [latex, setLatex] = useState('');
    const [activeTab, setActiveTab] = useState('greek');

    const quillRef = useRef();
    const buttonGroups = [
        { group: 'greek', name: 'Greek Symbols', buttons: greekSymbols.symbols },
        { group: 'simple', name: 'Simple Operators', buttons: simpleOperators.symbols },
        { group: 'relation', name: 'Relation Operators', buttons: relationOperators.symbols },
        { group: 'equality', name: 'Equality Operators', buttons: equalityOperators.symbols },
        { group: 'set', name: 'Set Operators', buttons: setOperators.symbols },
        { group: 'trignometric', name: 'Trignometric Operators', buttons: trignometricOperators.symbols },
        { group: 'logic', name: 'Logic Operators', buttons: logicNotations.symbols },
        { group: 'geometry', name: 'Geometry Operators', buttons: geometryNotations.symbols },
        { group: 'delemiters', name: 'Delemiters', buttons: delemiters.symbols },
        { group: 'functions', name: 'Functions', buttons: functions.symbols },
    ];

    const onLatexButtonClickHandler = (value) => {
        quillRef.current.mathField.cmd(value);
        quillRef.current.mathField.focus();
    };

    const onTabClickHandler = (tab) => {
        setActiveTab(tab);
    };

    useImperativeHandle(ref, () => ({
        // For sending the image up using Ref
        getSrc() {
            return latex;
        },
    }));

    useEffect(() => {
        if (props.value) {
            setLatex(props.value);
            quillRef.current.mathField.typedText(props.value + '\0');
            quillRef.current.mathField.focus();
        }
    }, [props.value]);

    return (
        <div>
            <Nav pills>
                {buttonGroups.map(group => (
                    <NavItem key={group.group}>
                        <NavLink className={activeTab === group.group ? 'active' : null}
                          onClick={() => onTabClickHandler(group.group)}>
                            {group.name}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>

            <div className="mt-2 tab-functions">

                <TabContent activeTab={activeTab}>
                    {buttonGroups.map(group => (
                        <TabPane key={group.group} tabId={group.group}>
                                <div className="d-flex flex-wrap justify-content-start">
                                    {group.buttons.map((button, index) => (
                                        <MathEquationEditorButton key={`math-btn-${group.group}-${index}`}
                                          name={<InlineMath>{button.name}</InlineMath>} value={button.value}
                                          click={onLatexButtonClickHandler} />
                                    ))}
                                </div>
                        </TabPane>
                    ))}
                </TabContent>

            </div>

            <div className="mt-2">
                <MathQuill className="math-editor" ref={quillRef} latex={latex}
                  onChange={ltx => setLatex(ltx)} />
            </div>
        </div>
    );
});

MathEquationEditor.propTypes = {
    value: PropTypes.string.isRequired,
};

export default MathEquationEditor;
