import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro'
import tailwind from "@astrojs/tailwind";
import starlightUtils from "@lorenzo_lewis/starlight-utils";


import {clickToCopyPlugin} from '/src/plugins/copyCodeBlock';
import {rehypeHeadingIds} from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import AutoImport from "astro-auto-import";
import starlightDocSearch from "@astrojs/starlight-docsearch";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
    output: 'static',
    adapter: vercel(),

    site: "https://flomaster.chrsnv.ru",
    base: "/",

    integrations: [
        starlight(
            {
                title: "Фломастер",
                head: [
                    {
                        tag: 'script',
                        attrs: {
                            defer: true,
                            src: 'https://webstats.chrsnv.ru/script.js',
                            'data-website-id': 'e8ff0de4-de47-420c-8b71-d8ef93efde62'
                        },
                    },
                ],
                logo: {
                    src: "/src/assets/flomaster.png",
                },
                locales: {
                    root: {
                        label: "Русский",
                        lang: "ru",
                    },
                },
                customCss: ["/src/styles/custom.css", "/src/styles/headings.css"],
                tableOfContents: {
                    maxHeadingLevel: 6
                },
                lastUpdated: true,
                social: {
                    github: "https://github.com/AuthFailed/flomaster/",
                    telegram: "https://t.me/+jH1mblw0ytcwOWUy",
                    openCollective: "https://planer.chrsnv.ru/spaces/issues/74f8fa320fc047a68c5f21bbb64f0e3f"
                },
                sidebar: [
                    {
                        label: "🛠️ Технина",
                        items: [
                            {
                                label: "🌐 Интернет",
                                autogenerate: {directory: "/phrases/tech/internet"}
                            },
                            {
                                label: "📺 Телевидение",
                                autogenerate: {directory: "/phrases/tech/television"}
                            },
                            {
                                label: "📟 Домофония",
                                autogenerate: {directory: "/phrases/tech/intercom"}
                            },
                            {
                                label: "📼 Видеонаблюдение",
                                autogenerate: {directory: "/phrases/tech/cctv"}
                            },
                            {
                                label: "🔧 Настройка оборудки",
                                autogenerate: {directory: "/phrases/tech/setup"}
                            },
                            {
                                label: "📝 Заявки и аварии",
                                autogenerate: {directory: "/phrases/tech/accidents"}
                            },
                        ],
                    },
                    {
                        label: "💭 Диалог",
                        items: [
                            {
                                label: "🗣️ Общение с клиентом",
                                autogenerate: {directory: "/phrases/dialog/communications"}
                            },
                            {
                                label: "😡 Книга возражений",
                                autogenerate: {directory: "/phrases/dialog/objectionworkbook"}
                            },
                            {
                                label: "📚 Регламенты",
                                autogenerate: {directory: "/phrases/dialog/reglaments"}
                            },
                            {
                                label: "🗃️ Правовая часть",
                                autogenerate: {directory: "/phrases/dialog/companylaw"}
                            },
                        ],
                    },
                    {
                        label: "🛒 Продажи",
                        items: [
                            {
                                label: "🗣️ Диалог",
                                autogenerate: {directory: "/phrases/sales/dialog"}
                            },
                            {
                                label: "💳 Платная помощь",
                                autogenerate: {directory: "/phrases/sales/paid-help"}
                            },
                            {
                                label: "🧾 Тарифы",
                                autogenerate: {directory: "/phrases/sales/tariffs"}
                            },
                            {
                                label: "📡 Продажа роутеров",
                                autogenerate: {directory: "/phrases/sales/routers"}
                            },
                            {
                                label: "📺 Продажа приставок",
                                autogenerate: {directory: "/phrases/sales/decoders"}
                            },
                            {
                                label: "🎥 Продажа камер",
                                autogenerate: {directory: "/phrases/sales/camcorders"}
                            },
                        ],
                    },
                ],
                plugins: [
                    starlightUtils({
                        multiSidebar: {
                            switcherStyle: "horizontalList",
                        },
                    }),
                    starlightDocSearch({
                        appId: "DN83H0EFK4",
                        apiKey: "26993d897f7166569aaa44ad941e0475",
                        indexName: 'flomaster-chrsnv',
                        insights: true
                    }),
                ],
                expressiveCode: {
                    plugins: [
                        clickToCopyPlugin(),
                        {
                            name: 'Hide copy button',
                            baseStyles: `
                    .expressive-code .copy button {
                      display: none;
                    }
                  `,
                        },

                    ],
                    styleOverrides: {
                        borderRadius: '0.5rem',
                        frames: {
                            shadowColor: '#124',
                        },
                    },
                    defaultProps: {
                        wrap: true,
                    },
                }
            }),
        AutoImport({
            imports: [{
                '@astrojs/starlight/components': 'starlight',
                'astro:assets': 'astroassets'
            }]
        }),
        react(),
        tailwind(),
        markdoc(),
        keystatic()],

    markdown: {
        rehypePlugins: [
            rehypeHeadingIds,
            [
                rehypeAutolinkHeadings,
                {
                    // Wrap the heading text in a link.
                    behavior: 'wrap',
                },
            ],
        ],
    },
});