import { APP_VIEW, URL } from '../../app.constants';

export const NAVBAR_MENU_ITEMS = [
    'Technology',
    'Design',
    'Culture',
    'Business',
    'Politics',
    'Science',
    'Health',
    'Style',
    'Travel',
];

export const APP_VIEW_VS_BUTTON_TEXT = {
    [APP_VIEW.HOME]: 'Create Blog',
    [APP_VIEW.CREATE_BLOG]: 'Cancel',
    [APP_VIEW.VIEW_BLOG]: 'Back',
    [APP_VIEW.EDIT_BLOG]: 'Cancel',
};

export const APP_VIEW_VS_BUTTON_CLICK_HANDLER_URL = {
    [APP_VIEW.HOME]: URL.CREATE,
    [APP_VIEW.CREATE_BLOG]: URL.HOME,
    [APP_VIEW.VIEW_BLOG]: URL.HOME,
    [APP_VIEW.EDIT_BLOG]: URL.HOME,
};

