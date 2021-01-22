import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { FormGroup, FormFeedback } from 'reactstrap';

import './RichTextEditor.css';
import WidgetButton from 'components/Button/WidgetButton';
import QuestionWidgetPopup from 'containers/Question/Editor/Widgets/QuestionWidgetPopup';
import * as actions from 'store/actions';

class RichTextEditor extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        change: PropTypes.func.isRequired,
        error: PropTypes.string,
        valid: PropTypes.bool,

        currentWidgetId: PropTypes.number.isRequired,
        addQuestionWidget: PropTypes.func.isRequired,
    }

    state = {
        editorState: EditorState.createWithContent(ContentState.createFromText(this.props.value || '')),
        popup: null,
    }

    _updateEditorState(editorState, callback) {
        this.setState(state => ({ ...state, editorState }), () => callback());
    }

    onEditorChangeHandler = (editorState) => {
        this._updateEditorState(editorState, () => {
            this.props.change(draftToMarkdown(convertToRaw(editorState.getCurrentContent()), {}));
        });
    }

    onSubmitWidgetHandler = (widget) => {
        const text = `${draftToMarkdown(convertToRaw(this.state.editorState.getCurrentContent()), {})
            }[[> widget id="${this.props.currentWidgetId}" <]]`;

        console.log(markdownToDraft(text));

        const contentState = convertFromRaw(markdownToDraft(text));
        const editorState = EditorState.moveFocusToEnd(EditorState.createWithContent(contentState, ''));

        this.setState(state => ({ ...state, editorState, popup: null }),
            () => {
                this.props.change(draftToMarkdown(convertToRaw(editorState.getCurrentContent(), {})));
                this.props.addQuestionWidget(widget);
            });
    }

    onOpenWidgetPopupHandler = () => {
        this.setState(state => ({
            ...state,
            popup: true,
        }));
    }

    onHideWidgetPopupHandler = () => {
        this.setState(state => ({ ...state, popup: null }));
    }

    getPopup = () => (
        <QuestionWidgetPopup id={this.props.currentWidgetId}
          value="" type=""
          hide={this.onHideWidgetPopupHandler}
          submit={this.onSubmitWidgetHandler} />
    )

    render() {
        const classes = ['form-control'];
        if (this.props.valid !== undefined && !this.props.valid) {
            classes.push('is-invalid');
        }

        return (
            <FormGroup>
                {this.state.popup && this.getPopup()}
                <div className={classes.join(' ')}>
                    <Editor editorState={this.state.editorState} wrapperClassName="editor-container"
                      editorClassName="editor" toolbarClassName="toolbar"
                      onEditorStateChange={this.onEditorChangeHandler}
                      toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'history'],
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                            }}
                      toolbarCustomButtons={[<WidgetButton click={this.onOpenWidgetPopupHandler} />]} />
                </div>
                <FormFeedback>{this.props.error}</FormFeedback>
            </FormGroup>
        );
    }
}

const mapStateToProps = state => ({
    currentWidgetId: state.question.currentWidgetId,
});

const mapDispatchToProps = dispatch => ({
    addQuestionWidget: widget => dispatch(actions.addQuestionWidget(widget)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RichTextEditor);
