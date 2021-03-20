---

# Heteronormativity and pornography: an algorithmic analysis of PornHub — Abstract

Ilir Rama, Alessandro Gandini, Giulia Giorgi, Silvia Semenzin (_University of Milan_); Lucia Bainotti (_University of Turin_); Claudio Agosti, Giulia Corona, Salvatore Romano (_Tracking Exposed_).

---

Online pornography is an increasingly pervasive phenomenon, which influences sexual and affective practices ([Albury 2014](https://doi.org/10.1080/23268743.2013.863654)), and frames gender exploration and performativity ([Scarcelli 2015](https://doi.org/10.1080/23268743.2015.1051914)). However, popular pornographic websites tend to reinforce a male, white, and heterosexual point of view, and thus contribute to foster hegemonic masculinity ([Burke 2016](https://doi.org/10.1080/23268743.2016.1196117)), the sexualization of minorities ([Fritz et al. 2020](https://doi.org/10.1007/s12147-020-09255-2)), and a heteronormative porn culture (Saunders 2020). At a platform level, the role of algorithms is pivotal in these processes. Algorithms contribute to manage content visibility ([Bucher 2012](https://doi.org/10.1177/1461444812440159)) and can reiterate the gender bias coded into them ([Noble 2018](https://doi.org/10.2307/j.ctt1pwt9w5)), reifying a specific view of the world due to their social embeddedness ([Pasquale 2016](https://www.hup.harvard.edu/catalog.php?isbn=9780674970847)). Existing research already points out the relevance of algorithms in relation to pornography, specifically with reference to pornography detection (Gehl, Moyer-Horner, and Yeo 2017), content moderation ([Gerrard & Thornham 2020](https://doi.org/10.1080/14680777.2020.1783807)]), and the creation of pornographic content by means of AI (van der Nagel 2020). However, less attention has so far been paid to the role played by algorithmic recommendations in concurring to reiterate heteronormative perspectives of sexual interests, desires and sexual orientation on the platform.

To fill this gap, we look at one of the biggest porn streaming platforms, PornHub, and how its recommendation system might vary based on socio-demographic characteristics (e.g. gender, race, sexual orientation). To empirically account for PornHub’s recommendation system, we take advantage of the browser extension “Pornhub Tracking Exposed” (poTREX), which aims to collect evidence on profiling. The data produced helps us research how behavioral tracking affects the distribution of content, and the economic logic underlying the platform ([Agosti and Corona 2020](https://pornhub.tracking.exposed/), [Raustiala and Sprigman 2018](https://doi.org/10.2139/ssrn.3226566)).

We consider how the recommending system might change according to users’ gender and sexuality: this includes changes in homepage layout, recommended videos, suggested categories, and popular content. Using a set of automated user accounts, we recreate the browsing activity of users of the website on the basis of predetermined viewing patterns across two dimensions: gender or sexual orientation, assigned by the researchers, and whether it is logged into an account or not (Sandvig 2014). The log-in status is relevant, as we consider two ways in which the platform might cluster its users: through information explicitly given to the platform (e.g. logging into an account and specifying gender), and based on browsing patterns by unregistered users (by leveraging on PornHub’s categories). 

Results are then analysed based on affordances of the platform such as categories, accounts (e.g. verified, channel, user), rating, and views. Further qualitative analysis might underline potential mismatches between imagery as linguistically constructed and video content, as well as if content varies according to gender, sexual orientations, and profiling methods (i.e. accounts vs. guest browsing). Based on this analysis, we will discuss the if and how algorithmic suggestions might reiterate a heteronormative perspective on sexual desire and sexuality typical of a heterosexual, white, and hegemonic masculinity.

*the two following datasets, belongs to the abstract above*

## 📁 potest\_12-19feb/[search_homes_clean.csv — 18Mb](https://github.com/tracking-exposed/experiments-data/blob/master/potests/potest_12-19feb/search_homes_clean.csv)

The first collection for research is quite remarkable because, at the end of February, PornHub removed, from the homepage layout, the section 'Recommended Category for You,' so you can see samples of data that aren't here anymore.

* [600 homes 11th February 2021](https://github.com/tracking-exposed/experiments-data/blob/master/potests/potest_12-19feb/600-home-11February21.json.gz) is the log produced by the first consequential access made for preliminary scoping the platform. 34 Mb JSON, compressed to 4Mb.

## 📁 potest\_3-12mar/[search_homes_clean_14032020.csv — 35Mb](https://github.com/tracking-exposed/experiments-data/blob/master/potests/potest_3-12mar/search_homes_clean_14032020.csv)

Second collection. The data wasn't used in the paper because of the surprising change we spot in the homepage layout at the end of February.
Comparing data of different nature always lead to more complexities, so we didn't consider them yet.

* [1000 homes 2nd March 2021](https://github.com/tracking-exposed/experiments-data/blob/master/potests/potest_3-12mar/1000-home-02March21.json.gz) is the second log, produced by thousand of consequential access to pornhub. This was a repetition of the 600 collections, one month later, same delay between access, but 1000 and lasting more than 3 hours. (the format is slightly reduced, 1.2Mb compressed)

---

# 📁 potest\_first/

The folder contains a dataset produced via [first pornhub collaborative analysis](https://pornhub.tracking.exposed/potest/final-1/).