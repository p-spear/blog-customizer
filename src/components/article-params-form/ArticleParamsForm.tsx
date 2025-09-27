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
import { RefObject, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	isOpen: boolean;
	formState: TFormData;
	onClick: () => void;
	asideRef: RefObject<HTMLElement> | undefined;
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
	isOpen,
	formState,
	onClick,
	asideRef,
	onButton,
}: ArticleParamsFormProps) => {
	const [formData, setFormData] = useState(formState);

	const titleFormStyle = {
		color: '#000',
		fontSize: '31px',
		fontFamily: 'Open Sans, sans-serif',
		textAlign: 'center' as const,
		fontWeight: '800',
		textTransform: 'uppercase' as const,
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
		onButton(formData);
	};

	const handleReset = () => {
		setFormData(defaultArticleState);
		onButton(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
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
