--
-- PostgreSQL database dump
--

\restrict Ge6qOWB7cUlYbITuMXiqX9JItO59zZDKwQ8N0jsLV7By3o7NZnZWnc95bbqS15K

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    image_url character varying(500),
    reading_time character varying(50),
    content text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.articles_id_seq OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, title, slug, image_url, reading_time, content, created_at) FROM stdin;
2	Helping Hands Initiative	helping-hands-initiative	/aiclose.png	3 mins	Our helping hands initiative focuses on direct community support...	2026-04-16 10:08:51.360284+07
3	Community Outreach Program	community-outreach-program	/aiclose.png	7 mins	Learn about our outreach program that connects donors...	2026-04-16 10:08:51.360284+07
1	День Космонавтики в Доме семьи	den-kosmonavtiki	/domsemyi1.jpg	15	12 апреля дом семье	2026-04-16 10:08:51.360284+07
\.


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 3, true);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: ix_articles_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_articles_id ON public.articles USING btree (id);


--
-- Name: ix_articles_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_articles_slug ON public.articles USING btree (slug);


--
-- PostgreSQL database dump complete
--

\unrestrict Ge6qOWB7cUlYbITuMXiqX9JItO59zZDKwQ8N0jsLV7By3o7NZnZWnc95bbqS15K

