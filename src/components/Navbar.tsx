import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Menu, X, Globe, Check, Activity } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { scan } from 'react-scan';
import { isDevelopment } from '@/utils/util';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reactScanEnabled, setReactScanEnabled] = useState(false);
  const [forceHover, setForceHover] = useState(true);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'skills', href: '#skills' },
    { key: 'contact', href: '#contact' },
  ];

  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desabilitar hover forçado após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceHover(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  function handleReactScan() {
    setReactScanEnabled(!reactScanEnabled);
  }

  useEffect(() => {
    scan({
      enabled: reactScanEnabled,
      showToolbar: reactScanEnabled
    });
  }, [reactScanEnabled]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className={`text-2xl font-bold text-primary relative cursor-pointer select-none flex items-center w-32 ${forceHover ? 'group-hover' : 'group'}`}
            whileHover={{ scale: 1.05 }}
          >
            {/* D -> move para esquerda e desaparece */}
            <span className={`${forceHover ? 'opacity-0 -translate-x-4' : 'group-hover:opacity-0 group-hover:-translate-x-4'} transition-all duration-300 ${!forceHover ? 'relative' : 'absolute'}`}>
              D
            </span>
            
            {/* E -> E + ric (ric vem da esquerda primeiro) */}
            <span className="flex items-center">
              <span className={`${forceHover ? 'opacity-100' : 'opacity-100 group-hover:opacity-100'} transition-opacity duration-300`}>
                E
              </span>
              <span className={`${forceHover ? 'w-auto opacity-100 translate-x-0' : 'w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0'} transition-all duration-300 delay-0 overflow-hidden whitespace-nowrap`}>
                ric
              </span>
            </span>
            
            {/* V -> V + itor (V se move junto com ric, itor vem depois) */}
            <span className="flex items-center">
              <span className={`${forceHover ? 'opacity-100 translate-x-0' : 'opacity-100 transition-all duration-300 delay-0 group-hover:translate-x-0'}`}>
                V
              </span>
              <span className={`${forceHover ? 'w-auto opacity-100 translate-x-0' : 'w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0'} transition-all duration-300 delay-150 overflow-hidden whitespace-nowrap`}>
                itor
              </span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {t(`nav.${item.key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>



          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>


            {/* ReactScan Toggle - only in development */}
            {isDevelopment() && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReactScan}
                className={`relative ${reactScanEnabled ? 'text-green-500 hover:text-green-600' : 'text-muted-foreground hover:text-foreground'}`}
                title={t(`nav.${reactScanEnabled ? 'reactScanEnabled' : 'reactScanDisabled'}`)}
              >
                <Activity className="h-5 w-5" />
                {reactScanEnabled && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="space-y-1">
                <DropdownMenuItem
                  onClick={() => i18n.changeLanguage('en')}
                  className={`flex items-center justify-between ${i18n.language === 'en' ? 'bg-accent' : ''}`}
                >
                  <span>English</span>
                  {i18n.language === 'en' && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => i18n.changeLanguage('pt')}
                  className={`flex items-center justify-between ${i18n.language === 'pt' ? 'bg-accent' : ''}`}
                >
                  <span>Português</span>
                  {i18n.language === 'pt' && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
