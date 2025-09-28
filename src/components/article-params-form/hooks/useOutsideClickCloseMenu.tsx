import { useEffect } from 'react';

type UseOutsideClickCloseMenu = {
	isMenuOpen: boolean;
	onChange: (newValue: boolean) => void;
	asideRef: React.RefObject<HTMLElement>;
};

export const useOutsideClickCloseMenu = ({
	isMenuOpen,
	asideRef,
	onChange,
}: UseOutsideClickCloseMenu) => {
	useEffect(() => {
		const handleClickOutsideForm = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				onChange(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutsideForm);

		return () => {
			document.removeEventListener('mousedown', handleClickOutsideForm);
		};
	}, [isMenuOpen]);
};
