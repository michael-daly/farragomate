import React, { Component, Fragment } from 'react';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import UIButton from '#/ui/UIButton.jsx';


const WordTile = SortableElement (({ word, onClick = null, disableButton }) =>
(
	<UIButton
		className='magnet-small'
		style={{ display: 'inline-block' }}
		text={word}
		onClick={onClick}
		disabled={disableButton}
	/>
));


const TilesContainer = SortableContainer (({ words, onClick = null, disabled }) =>
(
	<span>
	{
		words.map (( word, index ) =>
		(
			<WordTile
				key={`sentence-tile-${word}`}
				index={index}
				word={word}
				onClick={event => onClick (word, index, event)}
				disableButton={disabled}
				disabled={disabled}
			/>
		))
	}
	</span>
));

const SentenceTiles = ({ words, onClickWord, onClickClear, onMoveWord, disabled = false }) =>
(
	<div className='chalk sentence-tile-container' style={{ whiteSpace: 'pre' }}>
	{
		words.length <= 0 ? '' :
			<UIButton
				style={{ color: '#FF5154', paddingLeft: '0vw' }}
				text='X'
				onClick={onClickClear}
				disabled={disabled}
			/>
	}

		<TilesContainer
			axis='x'
			lockAxis='x'
			words={words}
			distance={1}
			onClick={onClickWord}
			onSortEnd={({ oldIndex, newIndex }) => onMoveWord (oldIndex, newIndex)}
			disabled={disabled}
		/>
	</div>
);


export default SentenceTiles;
