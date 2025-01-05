import utils from '@/utils';

const isMobile = utils.isMobile();
if (isMobile) {
    window.location.replace('./m.html');
} else {
    window.location.replace('./pc.html');
}