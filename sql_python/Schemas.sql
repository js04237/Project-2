--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-10-18 22:47:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 202 (class 1259 OID 26226)
-- Name: marine_mammal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marine_mammal (
    id character varying(100) NOT NULL,
    species character varying(65),
    quantity numeric,
    description character varying(500),
    url character varying(200),
    latitude numeric,
    longitude numeric,
    location character varying,
    sighted_at date,
    created_at date,
    updated_at date,
    orca_type character varying,
    orca_pod character varying
);


ALTER TABLE public.marine_mammal OWNER TO postgres;

--
-- TOC entry 2687 (class 2606 OID 26233)
-- Name: marine_mammal marine_mammal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marine_mammal
    ADD CONSTRAINT marine_mammal_pkey PRIMARY KEY (id);


-- Completed on 2020-10-18 22:47:54

--
-- PostgreSQL database dump complete
--

