import { createRoot } from 'react-dom/client';
import {
	SetStateAction,
	useEffect,
	useRef,
	useState,
	StrictMode,
	CSSProperties,
} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	TFormData,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const asideRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const handleClickOutsideForm = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutsideForm);

		return () => {
			document.removeEventListener('mousedown', handleClickOutsideForm);
		};
	}, [isOpen]);

	const handleClickArrow = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	const returnStyles = (data: SetStateAction<TFormData>) => {
		setFormState(data);
		setIsOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formState.fontFamilyOption.value,
					'--font-size': formState.fontSizeOption.value,
					'--font-color': formState.fontColor.value,
					'--container-width': formState.contentWidth.value,
					'--bg-color': formState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				formState={formState}
				onClick={handleClickArrow}
				asideRef={asideRef}
				onButton={returnStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
