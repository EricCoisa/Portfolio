import { FooterContainer, FooterContent, FooterText, FooterLinks, FooterLink } from './footer.styles';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          © {currentYear} Portfolio - {t('footer.rights')}
        </FooterText>
        <FooterLinks>
          <FooterLink href="#privacy" aria-label={t('footer.privacy')}>
            {t('footer.privacy')}
          </FooterLink>
          <FooterLink href="#terms" aria-label={t('footer.terms')}>
            {t('footer.terms')}
          </FooterLink>
          <FooterLink href="#contact" aria-label={t('footer.contact')}>
            {t('footer.contact')}
          </FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
