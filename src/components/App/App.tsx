import { SetStateAction, useState, CSSProperties } from 'react';

import { Article } from '../article/Article';
import {
	ArticleParamsForm,
	TFormData,
} from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [formState, setFormState] = useState(defaultArticleState);

	const returnStyles = (data: SetStateAction<TFormData>) => {
		setFormState(data);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': formState.fontFamilyOption.value,
					'--font-size': formState.fontSizeOption.value,
					'--font-color': formState.fontColor.value,
					'--container-width': formState.contentWidth.value,
					'--bg-color': formState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm formState={formState} onButton={returnStyles} />
			<Article />
		</main>
	);
};
