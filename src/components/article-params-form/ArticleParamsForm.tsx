import {
	fontSizeOptions,
	fontFamilyOptions,
	OptionType,
	defaultArticleState,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { useOutsideClickCloseMenu } from './hooks/useOutsideClickCloseMenu';

type ArticleParamsFormProps = {
	formState: TFormData;
	onButton: (data: TFormData) => void;
};

export type TFormData = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

export const ArticleParamsForm = ({
	formState,
	onButton,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formData, setFormData] = useState(formState);

	const asideRef = useRef<HTMLElement | null>(null);

	useOutsideClickCloseMenu({
		isMenuOpen,
		asideRef,
		onChange: setIsMenuOpen,
	});

	const titleFormStyle = {
		color: '#000',
		fontSize: '31px',
		fontFamily: 'Open Sans, sans-serif',
		textAlign: 'center' as const,
		fontWeight: '800',
		textTransform: 'uppercase' as const,
	};

	const handleClickArrow = () => {
		setIsMenuOpen((isMenuOpen) => !isMenuOpen);
	};

	const handleClickFont = (selected: OptionType) => {
		setFormData({ ...formData, fontFamilyOption: selected });
	};

	const handleClickSize = (selected: OptionType) => {
		setFormData({ ...formData, fontSizeOption: selected });
	};

	const handleClickFontColor = (selected: OptionType) => {
		setFormData({ ...formData, fontColor: selected });
	};

	const handleClickBackgroundColor = (selected: OptionType) => {
		setFormData({ ...formData, backgroundColor: selected });
	};

	const handleClickContentWidth = (selected: OptionType) => {
		setFormData({ ...formData, contentWidth: selected });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsMenuOpen(false);
		onButton(formData);
	};

	const handleReset = () => {
		setFormData(defaultArticleState);
		setIsMenuOpen(false);
		onButton(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleClickArrow} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 style={titleFormStyle}>Задайте параметры</h2>
					<Select
						selected={formData.fontFamilyOption}
						onChange={handleClickFont}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={formData.fontSizeOption}
						name='radio'
						onChange={handleClickSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={formData.fontColor}
						onChange={handleClickFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formData.backgroundColor}
						onChange={handleClickBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={formData.contentWidth}
						onChange={handleClickContentWidth}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
