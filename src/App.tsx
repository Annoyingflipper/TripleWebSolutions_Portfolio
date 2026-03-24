/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  Globe, 
  Zap, 
  Rocket, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  MessageSquare,
  Layout,
  Smartphone,
  Settings,
  Users,
  FileText,
  Palette,
  Code,
  Eye,
  Send,
  Search,
  ShoppingCart,
  Languages,
  ArrowRight,
  Plus,
  Minus,
  HelpCircle,
  CreditCard,
  Target,
  BarChart3,
  XCircle,
  CheckCircle2
} from "lucide-react";

const plans = [
  {
    id: "landing",
    name: "Nivel 1: Landing Page (Conversión)",
    price: "300",
    maintenance: "50 - 100",
    color: "brand-green",
    icon: <Target className="w-8 h-8 text-brand-green" />,
    description: "Ideal para campañas de anuncios y captación de leads específicos.",
    target: "Campañas de marketing y validación de productos",
    delivery: "5 a 10 días hábiles",
    revisions: "2 rondas de cambios",
    features: [
      "Diseño Single-Scroll de alto impacto UX/UI",
      "Formulario de contacto optimizado para conversión",
      "Integración con Email Marketing (Mailchimp/Sendinblue)",
      "Responsive Design (Optimizado para móviles)",
      "Configuración básica de SEO (Meta Tags, Open Graph)",
      "Optimización de carga (PageSpeed Score > 90)"
    ],
    idealFor: "Campañas de anuncios y captación de leads específicos."
  },
  {
    id: "corporativa",
    name: "Nivel 2: Web Corporativa / Profesional",
    price: "1,500",
    maintenance: "150 - 400",
    color: "brand-blue",
    icon: <Globe className="w-8 h-8 text-brand-blue" />,
    popular: true,
    description: "Para empresas que buscan una presencia digital sólida y autogestionable.",
    target: "Empresas en crecimiento y marcas personales",
    delivery: "2 a 4 semanas",
    revisions: "2 rondas de cambios",
    features: [
      "Estructura de 5 a 10 secciones personalizadas",
      "Panel de administración (CMS) fácil de usar",
      "Blog autogestionable con categorías",
      "Instalación de Certificado SSL y Seguridad Pro",
      "Capacitación de uso para el cliente (1h)",
      "Arquitectura de información para SEO avanzado",
      "Formularios de contacto y captación de leads",
      "Diseño 100% Responsive y optimización de carga"
    ],
    idealFor: "Empresas que buscan una presencia digital sólida y autogestionable."
  },
  {
    id: "ecommerce",
    name: "Nivel 3: E-commerce / Tienda Online",
    price: "3,000",
    maintenance: "150 - 400",
    color: "brand-purple",
    icon: <ShoppingCart className="w-8 h-8 text-brand-purple" />,
    description: "Tiendas completas listas para vender y gestionar cobros.",
    target: "Negocios que quieren vender productos online",
    delivery: "4 a 8 semanas",
    revisions: "3 rondas de cambios",
    features: [
      "Catálogo de productos con variables (talla, color)",
      "Carrito de compras y pasarela de pago (Stripe/PayPal)",
      "Gestión de inventario y notificaciones de pedido",
      "Módulo de cupones y ofertas especiales",
      "Panel de control de ventas y clientes",
      "SEO técnico especializado para productos",
      "Todo lo del Nivel 2 (CMS, Blog, SSL, etc.)",
      "Integración con sistemas de envío"
    ],
    idealFor: "Tiendas completas listas para vender y gestionar cobros."
  },
  {
    id: "webapp",
    name: "Nivel 4: Plataformas & Web Apps",
    price: "8,000",
    maintenance: "800 - 3,000",
    color: "brand-blue",
    icon: <Code className="w-8 h-8 text-brand-blue" />,
    description: "Soluciones a medida con lógica de negocio compleja.",
    target: "Startups y empresas con necesidades específicas",
    delivery: "12+ semanas",
    revisions: "Ilimitadas en fase de desarrollo",
    features: [
      "Desarrollo de Backend personalizado y Base de Datos",
      "Sistema de usuarios con roles y permisos",
      "Dashboard administrativo con reportes en tiempo real",
      "Integraciones con APIs externas (CRM, ERP)",
      "Infraestructura escalable y pruebas de carga",
      "Mantenimiento técnico preventivo incluido (3 meses)",
      "Funcionalidades avanzadas de E-commerce (opcional)",
      "Soporte técnico prioritario y escalabilidad"
    ],
    idealFor: "Soluciones a medida con lógica de negocio compleja."
  }
];

const recurringCosts = [
  { concepto: "Hosting (Alojamiento)", simple: "$5 - $15", profesional: "$30 - $90", enterprise: "$200+" },
  { concepto: "Mantenimiento Técnico", simple: "$50 - $100", profesional: "$150 - $400", enterprise: "$800 - $3,000" },
  { concepto: "Seguridad / SSL", simple: "Gratis", profesional: "$20 - $50", enterprise: "$100+" },
];

const comparisonData = [
  { feature: "Inversión inicial (Base)", n1: "$300", n2: "$1,500", n3: "$3,000", n4: "$8,000" },
  { feature: "Secciones", n1: "1 (Single-Scroll)", n2: "5 - 10", n3: "Ilimitadas", n4: "Ilimitadas" },
  { feature: "CMS (Autogestionable)", n1: "No", n2: "Sí", n3: "Sí", n4: "Sí (Custom)" },
  { feature: "SEO", n1: "Básico", n2: "Avanzado", n3: "Técnico", n4: "Estratégico" },
  { feature: "Tienda Online", n1: "No", n2: "No", n3: "Sí", n4: "Opcional" },
  { feature: "Base de Datos", n1: "No", n2: "No", n3: "Sí", n4: "Sí (Custom)" },
  { feature: "Entrega estimada", n1: "1-2 semanas", n2: "2-4 semanas", n3: "4-8 semanas", n4: "12+ semanas" },
];

const faqs = [
  {
    q: "¿El dominio está incluido?",
    a: "Sí, el dominio está incluido en el mantenimiento mensual de tu página web."
  },
  {
    q: "¿El hosting está incluido?",
    a: "Sí, el hosting está incluido dentro del mantenimiento mensual. Nosotros nos encargamos de toda la infraestructura técnica para que tu web esté siempre en línea."
  },
  {
    q: "¿Puedo pedir cambios?",
    a: "Sí, cada plan incluye rondas de revisiones específicas sobre el alcance aprobado."
  },
  {
    q: "¿Qué necesito entregar para iniciar?",
    a: "Logo, textos descriptivos, imágenes de alta calidad y referencias de sitios que te gusten."
  },
  {
    q: "¿Qué pasa si quiero agregar nuevas secciones?",
    a: "Nuestros sitios son escalables. Podemos añadir secciones adicionales con una cotización por separado."
  },
  {
    q: "¿El sitio será responsive?",
    a: "Absolutamente. Todos nuestros desarrollos se adaptan perfectamente a móviles, tablets y computadoras."
  },
  {
    q: "¿Cuánto tarda el proyecto?",
    a: "Depende del plan: desde 5 días para el Intermedio hasta 5 semanas para el Premium."
  },
  {
    q: "¿Puedo contratar mantenimiento después?",
    a: "Sí, el mantenimiento mensual asegura que tu sitio esté siempre actualizado y funcionando correctamente."
  },
  {
    q: "¿Puedo ampliar mi plan más adelante?",
    a: "Sí, puedes escalar de un plan a otro pagando la diferencia y los ajustes necesarios."
  }
];

const benefits = [
  { icon: <Palette className="w-6 h-6" />, title: "Diseño Moderno", desc: "Estética profesional que genera confianza inmediata." },
  { icon: <Smartphone className="w-6 h-6" />, title: "Responsive", desc: "Optimización total para cualquier dispositivo." },
  { icon: <Target className="w-6 h-6" />, title: "Enfoque Estratégico", desc: "Estructuras orientadas a la conversión y objetivos de negocio." },
  { icon: <MessageSquare className="w-6 h-6" />, title: "Comunicación Cercana", desc: "Acompañamiento constante durante todo el desarrollo." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Escalabilidad", desc: "Soluciones preparadas para crecer junto a tu empresa." },
];

const workProcess = [
  { step: "01", title: "Reunión inicial", desc: "Definimos objetivos y visión." },
  { step: "02", title: "Recolección", desc: "Recibimos tu información y materiales." },
  { step: "03", title: "Estructura", desc: "Definimos el mapa del sitio." },
  { step: "04", title: "Diseño", desc: "Creamos la propuesta visual." },
  { step: "05", title: "Desarrollo", desc: "Construimos la plataforma web." },
  { step: "06", title: "Revisión", desc: "Evaluamos el avance juntos." },
  { step: "07", title: "Ajustes", desc: "Aplicamos los cambios finales." },
  { step: "08", title: "Publicación", desc: "Lanzamos tu sitio al mundo." },
];

const maintenanceIncludes = [
  "Ajustes menores de texto",
  "Cambios simples de imágenes",
  "Soporte técnico básico",
  "Revisión general de funcionamiento",
  "Correcciones menores",
  "Acompañamiento post-entrega"
];

const maintenanceExcludes = [
  "Rediseño de secciones",
  "Nuevas funcionalidades",
  "Nuevas páginas completas",
  "Integraciones complejas",
  "Gestión de campañas publicitarias",
  "Creación de contenido desde cero"
];

const generalExclusions = [
  "Licencias externas",
  "Copywriting completo",
  "Producción de fotos o video",
  "Campañas publicitarias",
  "Gestión de redes sociales",
  "Traducciones"
];

const extraServices = [
  { icon: <Palette className="w-4 h-4" />, text: "Branding completo y manual de marca" },
  { icon: <FileText className="w-4 h-4" />, text: "Redacción de contenido" },
  { icon: <Palette className="w-4 h-4" />, text: "Diseño de logo" },
  { icon: <Settings className="w-4 h-4" />, text: "Integración CRM" },
  { icon: <CheckCircle2 className="w-4 h-4" />, text: "Automatizaciones" },
  { icon: <Layout className="w-4 h-4" />, text: "Blog" },
  { icon: <Languages className="w-4 h-4" />, text: "Multi idioma" },
  { icon: <ShoppingCart className="w-4 h-4" />, text: "Tienda online" },
];

function FAQItem({ q, a }: { q: string; a: string; key?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-slate-900">{q}</span>
        {isOpen ? <Minus className="h-5 w-5 text-brand-blue" /> : <Plus className="h-5 w-5 text-brand-blue" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-slate-600 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-blue/30 font-sans">
      {/* 1. Portada */}
      <header className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/agency/1920/1080?blur=8')] bg-cover bg-center opacity-25" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-brand-blue uppercase tracking-[0.2em]">Triple Web Solutions</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Portafolio de Planes Web
            </p>
            <div className="mt-6 flex flex-col items-center gap-2 text-slate-400">
              <p className="text-lg italic text-slate-300">“Soluciones web modernas para empresas que buscan crecer”</p>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        
        {/* 2. Introducción & 3. Objetivo */}
        <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 border-b border-slate-200">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Introducción</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Triple Web Solutions desarrolla páginas web modernas, funcionales y estratégicas para empresas que desean fortalecer su presencia digital y convertir su sitio web en una herramienta comercial real. Nos enfocamos en la captación, confianza, conversión y escalabilidad.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Objetivo del Portafolio</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Este documento busca presentar nuestros planes disponibles, explicar el alcance y diferencias entre ellos, y ayudarte a elegir la opción adecuada para tu negocio, dejando claras las condiciones y entregables.
            </p>
          </div>
        </section>

        {/* 4. Beneficios */}
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Beneficios de trabajar con nosotros</h2>
            <p className="mt-4 text-slate-600">Diseño, estrategia y desarrollo enfocados en resultados.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center p-6 rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Nuestros planes web */}
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Nuestros Planes Web</h2>
            <p className="mt-4 text-slate-600">Selecciona el nivel de impacto que tu negocio necesita.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, idx) => (
              <div
                key={plan.name}
                className="flex flex-col rounded-[40px] bg-white p-8 shadow-xl ring-1 ring-slate-200 transition-all hover:shadow-2xl"
              >
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{plan.name}</h3>
                  <div className="p-3 rounded-2xl bg-slate-50 shrink-0">{plan.icon}</div>
                </div>
                
                <div className="mb-8">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Precio Base</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">${plan.price}</span>
                    <span className="text-sm font-semibold text-slate-500">USD</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Mantenimiento: ${plan.maintenance} USD/mes</p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Incluye:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                          <Check className={`h-5 w-5 text-${plan.color} shrink-0`} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Ideal para:</h4>
                    <p className="text-sm text-slate-700 font-medium">{plan.idealFor}</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Entrega</p>
                    <p className="text-xs font-bold text-slate-900">{plan.delivery}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Revisiones</p>
                    <p className="text-xs font-bold text-slate-900">{plan.revisions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Tabla comparativa */}
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Tabla Comparativa</h2>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 text-sm font-bold text-slate-900 uppercase">Característica</th>
                  <th className="p-6 text-sm font-bold text-brand-green uppercase text-center">Nivel 1</th>
                  <th className="p-6 text-sm font-bold text-brand-blue uppercase text-center">Nivel 2</th>
                  <th className="p-6 text-sm font-bold text-brand-purple uppercase text-center">Nivel 3</th>
                  <th className="p-6 text-sm font-bold text-brand-blue uppercase text-center">Nivel 4</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 text-sm font-medium text-slate-700">{row.feature}</td>
                    <td className="p-6 text-sm text-slate-600 text-center">{row.n1}</td>
                    <td className="p-6 text-sm text-slate-600 text-center">{row.n2}</td>
                    <td className="p-6 text-sm text-slate-600 text-center">{row.n3}</td>
                    <td className="p-6 text-sm text-slate-600 text-center font-semibold">{row.n4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Costos Recurrentes */}
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Costos Recurrentes Mensuales</h2>
            <p className="mt-4 text-slate-600">Inversión necesaria para mantener tu plataforma activa y segura.</p>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 text-sm font-bold text-slate-900 uppercase">Concepto</th>
                  <th className="p-6 text-sm font-bold text-brand-green uppercase text-center">Simple</th>
                  <th className="p-6 text-sm font-bold text-brand-blue uppercase text-center">Profesional</th>
                  <th className="p-6 text-sm font-bold text-brand-purple uppercase text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recurringCosts.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 text-sm font-medium text-slate-700">{row.concepto}</td>
                    <td className="p-6 text-sm text-slate-600 text-center">{row.simple}</td>
                    <td className="p-6 text-sm text-slate-600 text-center">{row.profesional}</td>
                    <td className="p-6 text-sm text-slate-600 text-center font-semibold">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Alcance & 8. Mantenimiento */}
        <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-10 rounded-[40px] bg-slate-900 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Code className="text-brand-blue" /> Alcance General
            </h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3"><Check className="text-brand-blue shrink-0" /> Diseño y desarrollo del sitio</li>
              <li className="flex gap-3"><Check className="text-brand-blue shrink-0" /> Implementación funcional completa</li>
              <li className="flex gap-3"><Check className="text-brand-blue shrink-0" /> Adaptación responsive total</li>
              <li className="flex gap-3"><Check className="text-brand-blue shrink-0" /> Configuración inicial de entorno</li>
              <li className="flex gap-3"><Check className="text-brand-blue shrink-0" /> Asesoría en estructura de contenido</li>
              <li className="flex gap-3"><Check className="text-brand-blue shrink-0" /> Apoyo en despliegue inicial</li>
            </ul>
          </div>
          <div className="p-10 rounded-[40px] bg-white ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Settings className="text-brand-blue" /> Mantenimiento Mensual
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold text-brand-green uppercase mb-4">Sí incluye:</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  {maintenanceIncludes.map(i => <li key={i} className="flex gap-2"><Check className="w-4 h-4 shrink-0" /> {i}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-rose-500 uppercase mb-4">No incluye:</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  {maintenanceExcludes.map(i => <li key={i} className="flex gap-2"><XCircle className="w-4 h-4 shrink-0" /> {i}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Qué no incluyen los planes */}
        <section className="py-24 border-t border-slate-200">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <XCircle className="text-rose-500" /> Qué NO incluyen los planes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {generalExclusions.map(e => (
                <div key={e} className="flex items-center gap-3 text-sm text-slate-600">
                  <ArrowRight className="w-4 h-4 text-slate-300" /> {e}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Servicios adicionales */}
        <section className="py-24">
          <div className="rounded-[40px] bg-white p-12 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Servicios Adicionales Opcionales</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {extraServices.map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-brand-blue">{s.icon}</div>
                  <span className="text-sm font-bold text-slate-700">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Proceso de trabajo */}
        <section className="py-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Nuestro Proceso de Trabajo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((p, i) => (
              <div key={i} className="relative p-8 rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
                <span className="text-5xl font-black text-slate-100 absolute top-4 right-4">{p.step}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">{p.title}</h3>
                <p className="text-sm text-slate-500 relative z-10">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Forma de pago & Revisiones */}
        <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-10 rounded-[40px] bg-brand-blue text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><CreditCard /> Forma de Pago</h2>
            <p className="text-xl font-medium mb-4">Pago completo al iniciar.</p>
            <ul className="text-sm text-blue-100 space-y-2">
              <li>• El proyecto inicia tras el pago total.</li>
              <li>• Se puede negociar una forma de pago personalizada a partir de los $1,000 USD en adelante.</li>
              <li>• Cambios fuera del alcance se cotizan por separado.</li>
            </ul>
          </div>
          <div className="p-10 rounded-[40px] bg-white ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"><Eye className="text-brand-blue" /> Revisiones</h2>
            <p className="text-slate-600 mb-4">Las revisiones son ajustes sobre el diseño propuesto (colores, tipografía, orden de elementos). No incluyen cambios estructurales profundos una vez aprobada la fase anterior.</p>
            <ul className="text-sm text-slate-500 space-y-2">
              <li>• Intermedio: 2 rondas</li>
              <li>• Profesional: 2 rondas</li>
              <li>• Premium: 3 rondas</li>
            </ul>
          </div>
        </section>

        {/* Casos ideales & Entregables */}
        <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Casos Ideales por Plan</h2>
            <div className="space-y-4">
              {plans.map(plan => (
                <div key={plan.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-1">{plan.name}</h4>
                  <p className="text-sm text-slate-600">{plan.idealFor}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Entregables Finales</h2>
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3"><CheckCircle2 className="text-brand-green shrink-0" /> Sitio web publicado y funcional</li>
              <li className="flex gap-3"><CheckCircle2 className="text-brand-green shrink-0" /> Acceso al panel de administración (si aplica)</li>
              <li className="flex gap-3"><CheckCircle2 className="text-brand-green shrink-0" /> Guía básica de uso</li>
              <li className="flex gap-3"><CheckCircle2 className="text-brand-green shrink-0" /> Configuración de correos corporativos</li>
            </ul>
          </div>
        </section>

        {/* Garantía & Costos Operativos */}
        <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-10 rounded-[40px] bg-brand-green text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><ShieldCheck /> Garantía Post-Entrega</h2>
            <p className="text-xl font-medium mb-4">15 días de soporte técnico gratuito.</p>
            <p className="text-sm text-green-100">La garantía aplica únicamente a errores técnicos del desarrollo entregado. No incluye cambios nuevos ni ampliaciones.</p>
          </div>
          <div className="p-10 rounded-[40px] bg-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"><Globe className="text-brand-blue" /> Costos Operativos</h2>
            <p className="text-sm text-slate-600 mb-4">El costo del dominio y hosting está incluido dentro del mantenimiento mensual de la página. Esto no es un costo adicional asumido por el cliente por separado.</p>
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Mantenimiento mensual:</p>
              <p className="text-lg font-bold text-slate-900">Desde $50 USD / mes</p>
              <p className="text-[10px] text-slate-400 mt-1">*Varía según el plan seleccionado.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* 19. Condiciones & 20. Nota Estratégica */}
        <section className="py-24 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Condiciones y Disclaimers</h2>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• Los tiempos dependen de la colaboración y feedback del cliente.</li>
                <li>• Retrasos en feedback afectan directamente la fecha de entrega.</li>
                <li>• La propuesta puede ajustarse según requerimientos específicos.</li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Nota sobre Estrategia</h2>
              <p className="text-sm text-slate-600 italic">
                "Una página web es una herramienta estratégica para fortalecer la presencia digital, pero los resultados comerciales dependen también de factores como tráfico, oferta, pauta publicitaria y seguimiento comercial."
              </p>
            </div>
          </div>
        </section>

        {/* Cierre */}
        <footer className="py-24 text-center border-t border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Triple Web Solutions</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Buscamos desarrollar herramientas digitales que no solo representen bien a una empresa, sino que también la ayuden a crecer con una base sólida y profesional.
          </p>
        </footer>
      </main>
    </div>
  );
}
