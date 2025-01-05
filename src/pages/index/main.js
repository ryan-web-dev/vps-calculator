import utils from '@/utils';

const isMobile = utils.isMobile();
if (isMobile) {
    window.location.replace('./m');
} else {
    window.location.replace('./pc');
}