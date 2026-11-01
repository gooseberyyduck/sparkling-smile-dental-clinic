
import {
  Link,
  useParams,
} from "react-router-dom";

type FAQ = {
  id: number;
  question: string;
  answer: string;
  display_order: number;
};


type ServiceContent = {
  overview: string;
  when_needed: string;
  procedure_details: string;
  benefits: string;
  aftercare: string;
};

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "dental-jewellery": {
    overview: "Dental jewellery is a small decorative ornament bonded to the visible surface of a tooth for aesthetic purposes. Depending on the product and clinical approach, it may be a small crystal or other purpose-made dental ornament. It does not improve the health or strength of a tooth and is not a substitute for examination, cleaning, or treatment of dental disease. Before placement, the dentist should assess the tooth, enamel, gums, bite, existing restorations, and the patient's ability to maintain plaque control. The type of bonding material and method of placement should be explained in advance.",
    when_needed: 'A patient may enquire about dental jewellery when they want a temporary or longer-term decorative feature on a visible tooth. It should only be considered when the selected tooth and surrounding tissues are healthy enough for the procedure. Active decay, gum inflammation, enamel defects, cracks, poor oral hygiene, or a bite that repeatedly contacts the ornament may make placement unsuitable or require treatment first. The dentist should also discuss the possibility of plaque accumulation around the ornament and the risk of it loosening or being swallowed.',
    procedure_details: "The dentist first examines the mouth and confirms that the proposed tooth is suitable. The intended position, size, appearance, material, expected longevity, limitations, and removal process are discussed. If proceeding, the tooth surface is cleaned and isolated, and a conservative bonding protocol using dental materials is followed. The ornament is positioned and bonded according to the material manufacturer's instructions, then checked for excess material, comfort, and interference with the bite. Tooth drilling is generally not part of a simple bonded-jewellery procedure; the exact method must be confirmed by the treating dentist.",
    benefits: 'For a suitable patient, dental jewellery can provide an individual cosmetic accent without intentionally changing the overall shape of the tooth. Placement is usually limited to a selected visible tooth and can be discussed as an elective cosmetic option. The appearance and duration vary with the ornament, bonding method, oral habits, and maintenance. It does not whiten teeth, repair damage, or prevent dental disease.',
    aftercare: 'Brush carefully around the ornament and clean between the teeth every day so plaque does not collect at its edges. Avoid picking, twisting, or pulling at it, and avoid biting hard objects with the decorated tooth. Contact the clinic if it becomes loose, sharp, uncomfortable, or causes gum irritation; do not attempt to glue it back yourself. Ask the dentist to assess removal rather than scraping or pulling it off at home. Continue routine dental examinations and professional cleaning as advised.',
  },
  "dental-veneers": {
    overview: 'Dental veneers are thin, custom-made coverings bonded to the front surfaces of selected teeth to change aspects of their colour, shape, size, or visual alignment. Veneers may be made from ceramic or composite materials, and the choice affects preparation, appearance, repairability, maintenance, and longevity. They are a cosmetic restorative option, not a treatment for active decay or gum disease. A careful assessment of enamel, existing fillings, bite, tooth position, gum health, and habits such as clenching is important because some veneer plans require irreversible removal of a small amount of tooth structure.',
    when_needed: "Veneers may be discussed for selected teeth with persistent discolouration, minor chips, irregular contours, small gaps, or shape differences when simpler options are not appropriate or do not meet the patient's goals. They are not suitable for every smile. Extensive decay, untreated gum disease, inadequate enamel, severe misalignment, heavy grinding, or an unstable bite may require other treatment or make veneers a poor choice. The dentist should compare alternatives such as whitening, bonding, orthodontics, or crowns and explain which concerns each option can and cannot address.",
    procedure_details: 'Planning usually begins with a clinical examination, photographs, shade discussion, and assessment of the bite and gum line. Depending on the case, scans or impressions are taken and a proposed shape and shade are reviewed. Some veneer types require minimal or more substantial enamel preparation; others may be possible with little preparation in carefully selected cases. Temporary veneers may be used while laboratory-made restorations are prepared. At fitting, the dentist checks fit, contacts, colour, and bite before bonding the veneers with dental adhesive. The number of visits and exact steps depend on the material and treatment plan.',
    benefits: "Veneers can improve the appearance of selected teeth by changing their visible colour, contour, or proportions. A well-planned result may create a more harmonious smile and can be designed to suit the patient's facial features and preferences. Veneers do not make teeth immune to decay, fracture, or gum disease, and they may need repair or replacement over time. The result depends on case selection, material, oral habits, and maintenance; no particular shade or lifespan can be guaranteed.",
    aftercare: 'Maintain careful brushing with a soft toothbrush and fluoride toothpaste, and clean between teeth daily, including along the veneer margins. Avoid using veneered teeth to open packaging, bite fingernails, or chew very hard objects. Attend reviews so the dentist can monitor the margins, gums, and bite. If you clench or grind, ask whether a protective night guard is appropriate. Contact the clinic if a veneer chips, moves, feels high when biting, or causes persistent sensitivity.',
  },
  "digital-smile-design": {
    overview: "Digital smile design is a planning and communication approach that uses clinical photographs, video, digital scans, and design software to help evaluate possible changes to a patient's smile. It can assist the dentist and patient in discussing tooth proportions, visible gum display, midline, shade, and the relationship between the smile and facial features. It is a visual planning aid rather than a treatment in itself. A digital preview is an approximation and cannot guarantee that the final clinical result will look exactly the same, because biological tissues, bite function, material properties, and treatment limitations must also be considered.",
    when_needed: 'It may be useful for patients considering a coordinated cosmetic plan, such as veneers, crowns, whitening, orthodontic treatment, or gum procedures. It can also help when several teeth are involved and the patient wants to understand proposed changes before deciding. It is not necessary for every dental treatment and does not replace a full examination, diagnosis, or discussion of oral-health priorities. Patients with untreated decay, gum disease, infection, or functional problems may need those issues addressed before cosmetic planning proceeds.',
    procedure_details: "The dental team discusses the patient's concerns and goals, then records photographs and, where appropriate, video, intraoral scans, impressions, and bite information. Digital measurements and design tools are used to create a proposed visual arrangement or simulation. The dentist reviews whether the proposal is compatible with tooth structure, gum health, speech, bite, and available restorative options. A mock-up or trial preview may be possible in selected cases. The final plan, costs, alternatives, risks, and sequence of any treatment are discussed before consent is obtained.",
    benefits: 'Digital planning can make complex cosmetic options easier to understand and can improve communication about shape, proportion, and expected changes. It may help the patient compare alternatives and make more informed decisions. It can also help the dental team coordinate laboratory and restorative steps. It does not itself improve oral health, establish that a proposed treatment is clinically suitable, or guarantee a particular appearance.',
    aftercare: 'There is generally no special aftercare for a planning or photography appointment. Follow any instructions for scans, impressions, or temporary mock-ups if used. Take time to review the proposed plan and ask questions about irreversible tooth preparation, maintenance, alternatives, and likely limitations before agreeing to treatment. Any subsequent procedure has its own aftercare requirements, which should be provided by the treating dentist.',
  },
  "hollywood-smile": {
    overview: "A 'Hollywood smile' is a broad, non-specific term commonly used to describe a coordinated cosmetic plan intended to improve the visible appearance of the smile. Depending on the patient's needs, a plan might include whitening, composite bonding, veneers, crowns, orthodontics, gum treatment, or a combination. There is no single standard Hollywood-smile procedure. The appropriate approach should be based on oral health, tooth structure, gum condition, bite, facial features, patient expectations, and the least invasive suitable options. Cosmetic treatment should not compromise healthy tooth structure simply to achieve a particular trend or shade.",
    when_needed: 'A patient may explore a smile makeover because of concerns about tooth colour, shape, worn edges, uneven visible teeth, spaces, or old restorations. A consultation is needed to determine whether these concerns can be addressed safely and what treatment is proportionate. Active decay, gum disease, infection, significant bite problems, or untreated grinding should be assessed first. Some concerns may be managed more conservatively with whitening or bonding rather than extensive crowns or veneers.',
    procedure_details: "The process begins with a comprehensive dental examination and a discussion of the patient's priorities. Photographs, scans, X-rays, or digital planning may be used when clinically appropriate. The dentist evaluates tooth and gum health, bite, tooth display, and existing restorations, then explains suitable options and their limitations. If treatment is chosen, it may be completed in stages, such as stabilising oral health, whitening where indicated, orthodontic alignment, and then placing selected restorations. Temporary restorations and laboratory stages may be required. A written treatment plan should clarify sequence, materials, costs, risks, and maintenance.",
    benefits: "A personalised plan may improve the colour, shape, symmetry, and overall visual balance of the smile. Staging treatment can help address oral-health needs before cosmetic changes are made. The benefits depend on the procedures selected and the patient's starting condition. A smile makeover cannot guarantee perfect symmetry or a fixed shade, and restorations may require future maintenance, repair, or replacement.",
    aftercare: 'Aftercare depends on the procedures performed. Maintain daily brushing and interdental cleaning, attend professional reviews, and follow specific instructions for whitening, veneers, crowns, or other restorations. Avoid habits that can chip or overload teeth, such as chewing ice or biting hard objects. Ask whether a night guard is appropriate if you grind your teeth. Contact the clinic if a restoration loosens, chips, causes persistent sensitivity, or changes your bite.',
  },
  "snap-on-smile": {
    overview: 'A snap-on smile is a removable, custom-made cosmetic appliance designed to fit over some or all visible teeth to alter their appearance temporarily. It may be considered by selected patients who want a removable option, but it is not equivalent to fixed veneers, crowns, orthodontic treatment, or replacement of missing teeth. The fit, comfort, appearance, speech, chewing ability, and suitability vary by individual. The underlying teeth and gums still require normal care, and an appliance should not be used to conceal untreated dental disease.',
    when_needed: "It may be discussed by people seeking a removable cosmetic covering for selected social or aesthetic situations. Before considering it, the dentist should assess cavities, gum health, tooth mobility, bite, missing teeth, and the patient's ability to insert, remove, and clean the appliance. It may be unsuitable where the appliance would trap plaque, irritate tissues, interfere with the bite, or worsen an existing problem. The dentist should explain what the appliance can realistically achieve and whether other treatments would be safer or more functional.",
    procedure_details: "The dentist examines the mouth and discusses the patient's goals, expectations, and limitations of a removable covering. If appropriate, impressions or digital scans and bite records are taken and sent for appliance fabrication. At the fitting appointment, the dentist checks retention, comfort, speech, contacts, and whether the appliance causes pressure or bite interference. Adjustments may be required. The patient should be shown how to insert, remove, clean, and store the appliance and when it should or should not be worn.",
    benefits: 'For a suitable case, a removable appliance may provide a temporary change in the visible appearance of teeth without permanently preparing their front surfaces. It can be taken out for cleaning and may offer an alternative for patients who are not ready for fixed cosmetic treatment. It does not correct the underlying position or health of teeth, and it may not be suitable for eating or continuous wear. The appearance and comfort depend on the design and individual anatomy.',
    aftercare: 'Clean the appliance exactly as instructed using products suitable for its material; avoid hot water or abrasive cleaners unless specifically approved. Remove it for cleaning of natural teeth and gums, and store it in its protective case when not in use. Do not force it into place or continue wearing it if it causes pain, ulcers, pressure, or changes in your bite. Attend review appointments and contact the clinic if it cracks, becomes loose, or no longer fits.',
  },
  "teeth-whitening": {
    overview: 'Professional teeth whitening is a cosmetic procedure intended to lighten the colour of natural teeth by using an approved bleaching agent under dental guidance. Tooth colour can be affected by ageing, food and drink, tobacco, trauma, medications, and developmental conditions. The degree of response varies and some stains respond less predictably than others. Whitening changes the colour of natural tooth structure; fillings, crowns, veneers, and dentures do not whiten in the same way, so existing restorations may become mismatched. A dental examination is important before treatment to identify decay, cracks, gum inflammation, or other causes of discolouration.',
    when_needed: 'Whitening may be considered by adults who are concerned about general yellowing or selected external or internal stains and whose teeth and gums are suitable. It may not be appropriate during pregnancy or breastfeeding as a precaution, for patients with untreated decay or gum disease, significant sensitivity, exposed roots, or certain types of discolouration. Children and adolescents require individual dental assessment. The dentist should explain likely results, limitations, potential sensitivity, and alternatives before treatment.',
    procedure_details: "The dentist first examines the mouth, discusses the cause of discolouration, checks existing restorations, and records the starting shade where appropriate. The chosen method may involve in-clinic application, dentist-supervised take-home trays, or another suitable approach. Product concentration, exposure time, isolation of the gums, and number of sessions depend on the method and the patient's needs. The dentist provides specific instructions and monitors for sensitivity or soft-tissue irritation. Whitening should not be attempted with unregulated products or household substances.",
    benefits: 'For suitable natural teeth, whitening can reduce certain stains and make the smile appear brighter without changing tooth shape. It is a non-restorative cosmetic option and may be less invasive than placing coverings solely to change colour. Results vary, may not be uniform, and are not permanent; maintenance may be needed. Whitening does not treat cavities, gum disease, or intrinsic structural defects.',
    aftercare: "Follow the dentist's instructions about eating, drinking, brushing, and use of trays or gel. Temporary tooth sensitivity or gum irritation can occur; stop and contact the clinic if symptoms are significant or persistent. Avoid overusing whitening products or combining products without advice. Maintain good oral hygiene and attend regular reviews. Discuss shade matching before whitening if crowns, veneers, or fillings are visible, as restorations may not change colour.",
  },
  "general-dentistry": {
    overview: "General dentistry covers the assessment, prevention, diagnosis, and management of common conditions affecting teeth, gums, and other oral tissues. It includes routine examinations, preventive advice, diagnosis of pain or sensitivity, fillings and other basic restorations where appropriate, and referral or coordination for more complex care. The aim is to maintain oral health, identify concerns early, and help patients understand their options. The exact services offered at a visit depend on the patient's needs, clinical findings, and the facilities available at the clinic.",
    when_needed: 'A general dental consultation is appropriate for routine preventive care, even when there are no symptoms. Patients should seek assessment for toothache, sensitivity, bleeding gums, bad breath that persists, broken or loose teeth, mouth ulcers that do not heal, swelling, injury, or changes in the mouth. People with medical conditions, medications that affect oral health, dry mouth, or a history of gum disease or decay may need an individually planned review schedule.',
    procedure_details: "The dentist reviews the patient's medical and dental history, current concerns, medications, and relevant risk factors. An examination may include teeth, gums, bite, soft tissues, and existing restorations. X-rays or other diagnostic tests are recommended only when clinically justified. The dentist explains the findings, discusses preventive measures and treatment alternatives, and agrees on a care plan with the patient. Treatment may be provided during the same visit or arranged separately depending on complexity and consent.",
    benefits: 'Regular general dental care can help identify decay, gum disease, wear, and other concerns before they become more advanced. It supports prevention, early diagnosis, informed treatment choices, and continuity of care. Benefits depend on attendance, home care, risk factors, and the treatment plan; routine visits cannot prevent every dental problem.',
    aftercare: 'Follow the individual care plan and maintain brushing twice daily with fluoride toothpaste, daily cleaning between teeth, and a balanced approach to sugary foods and drinks. Attend the review interval recommended by the dentist rather than assuming everyone needs the same schedule. Seek prompt advice for new pain, swelling, trauma, bleeding, or a persistent mouth lesion. Inform the clinic about changes in medical history or medication.',
  },
  "dental-cleaning": {
    overview: 'Professional dental cleaning is a preventive procedure to remove plaque, hardened deposits known as calculus or tartar, and selected surface stains from tooth surfaces and around the gum line. Deposits can accumulate in areas that are difficult to clean effectively at home. The type and extent of cleaning depend on gum health and the amount and location of deposits. A routine scale and polish is not the same as periodontal treatment for advanced gum disease; deeper cleaning may require a separate assessment and treatment plan.',
    when_needed: 'Cleaning may be recommended as part of preventive care or when plaque and calculus have accumulated, gums bleed during brushing, or the dentist identifies areas that are difficult to keep clean. Patients with a history of gum disease, smoking, diabetes, orthodontic appliances, implants, or certain medical factors may need a personalised maintenance schedule. Bleeding gums should be assessed rather than treated as simply a need for more polishing, because they can indicate inflammation.',
    procedure_details: 'The dental professional first assesses the teeth and gums and explains the proposed cleaning. Deposits are removed using suitable hand instruments or powered scaling equipment, with attention to the areas involved. Polishing may be performed if appropriate, and oral-hygiene techniques or interdental cleaning aids may be demonstrated. If there are deep periodontal pockets or significant attachment loss, the dentist may recommend periodontal charting, deeper scaling, or referral rather than relying on routine cleaning alone.',
    benefits: 'Removing plaque and calculus supports gum health and makes daily cleaning easier. It can reduce sources of local irritation and remove some external staining. Professional cleaning also gives the dental team an opportunity to review oral hygiene and identify areas needing attention. It does not reverse established loss of supporting bone or replace treatment for active periodontal disease.',
    aftercare: 'Some patients experience temporary gum tenderness, slight bleeding, or sensitivity after cleaning, especially when deposits were extensive or gums were inflamed. Continue gentle brushing and interdental cleaning unless the dentist advises otherwise. Follow recommendations about home-care tools and the next maintenance visit. Contact the clinic if pain, bleeding, or swelling is severe or does not settle as expected.',
  },
  "dental-polishing": {
    overview: "Dental polishing is a procedure that smooths selected tooth surfaces and may remove some external stains after or alongside professional cleaning. It commonly uses a rotating cup or brush with a suitable polishing material, or another technique selected for the patient's needs. Polishing is not the same as whitening: it does not change the natural internal shade of teeth. It should be performed selectively because unnecessary or overly aggressive polishing can affect tooth surfaces and some restorative materials.",
    when_needed: 'Polishing may be considered when surface stains or deposits remain after assessment and cleaning, or as part of a preventive maintenance visit when appropriate. It may not be necessary at every cleaning appointment. The dental professional should consider enamel condition, exposed root surfaces, sensitivity, implants, crowns, veneers, and other restorations before choosing the method and material.',
    procedure_details: 'The dental professional examines the teeth and identifies the surfaces that may benefit from polishing. If suitable, a polishing cup, brush, air-polishing device, or other selected method is used with material appropriate to the tooth and restoration surfaces. The operator controls pressure and duration and avoids unnecessary treatment of areas where polishing is not indicated. The patient may receive advice about the source of staining and ways to reduce recurrence.',
    benefits: 'Polishing can leave treated surfaces feeling smoother and may improve the appearance of certain external stains. It can complement professional cleaning and oral-hygiene education. It does not remove deep intrinsic stains, treat decay, repair enamel defects, or replace periodontal care. Results depend on the type of stain and the method used.',
    aftercare: "Follow the dental team's advice about brushing, interdental cleaning, and stain prevention. Avoid tobacco and limit frequent exposure to strongly staining foods and drinks if these are concerns. Do not use abrasive home powders or aggressive brushing to reproduce a professional polish. Report ongoing sensitivity or irritation and attend future cleaning visits at the interval recommended for your oral health.",
  },
  "dental-filling": {
    overview: "A dental filling is a restoration used to repair a tooth affected by decay or limited structural damage. The dentist removes diseased or weakened tissue as appropriate and restores the missing portion with a material selected for the tooth's location, size of defect, bite forces, and aesthetic needs. Common materials include tooth-coloured composite and other restorative materials. Not every damaged tooth can be repaired with a simple filling; larger defects may need an inlay, onlay, crown, or other treatment. Diagnosis and material selection are individual clinical decisions.",
    when_needed: "A filling may be recommended when decay has created a cavity or when a small fracture or defective restoration can be repaired predictably. Symptoms may include sensitivity or food trapping, but early decay may have no symptoms. The dentist considers the depth and extent of damage, pulp health, remaining tooth structure, X-ray findings where indicated, and the patient's risk of further decay. Deep decay may require additional treatment or monitoring, and a root canal may be needed if the pulp is irreversibly affected.",
    procedure_details: 'The dentist examines the tooth and may take an X-ray if needed to assess the extent of decay. Local anaesthesia may be used depending on the tooth and procedure. The affected tissue is removed conservatively, the cavity is prepared, and the selected filling material is placed and shaped. For bonded tooth-coloured fillings, the tooth is isolated and bonding steps are followed before the material is placed and hardened. The dentist checks the contacts and bite, then polishes the restoration. The patient is informed if further treatment or review is needed.',
    benefits: 'A filling can restore the contour and function of a tooth, help seal a treated cavity, and make chewing more comfortable. Tooth-coloured materials can blend with natural teeth in visible areas. A filling does not make the tooth indestructible; the remaining tooth may still be vulnerable to fracture or recurrent decay, particularly when the restoration is large.',
    aftercare: 'Follow instructions about eating while the mouth is numb and any material-specific precautions. Mild sensitivity can occur for a short period, but contact the clinic if pain is severe, persists, increases, or the bite feels high. Brush twice daily with fluoride toothpaste, clean between teeth, and reduce frequent sugary snacks and drinks. Attend reviews so the dentist can monitor the restoration and surrounding tooth.',
  },
  "fluoride-treatment": {
    overview: 'Professional fluoride treatment applies a clinically selected fluoride product to tooth surfaces to help strengthen enamel and reduce the risk of dental caries. Fluoride supports remineralisation of early enamel changes and makes enamel more resistant to acid produced by plaque bacteria. Products may include varnishes, gels, or other formulations, and their use depends on age, caries risk, product instructions, and local clinical guidance. Fluoride treatment is one part of prevention and does not replace brushing with fluoride toothpaste, dietary measures, or treatment of established cavities.',
    when_needed: 'The dentist may recommend professional fluoride for children or adults with increased caries risk, such as a history of frequent cavities, early enamel lesions, dry mouth, exposed root surfaces, orthodontic appliances, or difficulty maintaining plaque control. The frequency and formulation should be based on individual assessment. Patients should inform the dental team about allergies, relevant medical conditions, and other fluoride products being used.',
    procedure_details: "The dental professional reviews the patient's caries risk and selects a suitable product and application method. Teeth may be cleaned or dried as directed by the product instructions. Fluoride varnish or another formulation is applied to the appropriate surfaces in the recommended amount. The team explains any product-specific instructions about eating, drinking, brushing, or rinsing after application. The appointment is usually brief, but the exact process varies by product.",
    benefits: 'Fluoride can support enamel remineralisation and reduce the likelihood of new cavities in patients for whom it is indicated. It may be particularly useful as part of a broader prevention plan for people at elevated risk. It cannot rebuild a large cavity, reverse every type of enamel defect, or guarantee that decay will not occur.',
    aftercare: 'Follow the specific instructions given for the fluoride product used, as recommendations can differ between varnishes, gels, and other preparations. Continue twice-daily brushing with an age-appropriate amount of fluoride toothpaste and clean between teeth. Follow dietary and recall advice, and report any unexpected reaction. Do not apply additional high-concentration fluoride products unless advised by a dental professional.',
  },
  "gum-disease-treatment": {
    overview: 'Gum disease treatment aims to control inflammation and infection affecting the tissues that support the teeth. Gingivitis is inflammation of the gums and may improve with effective plaque removal and professional care. Periodontitis involves damage to the supporting attachment and bone and requires a more detailed assessment and ongoing maintenance. Treatment is tailored to the severity and may include oral-hygiene instruction, professional removal of plaque and calculus, deeper periodontal instrumentation, risk-factor management, and referral or further procedures when indicated.',
    when_needed: 'Assessment may be needed for bleeding gums, redness, swelling, persistent bad breath, gum recession, pus, loose teeth, or changes in the way teeth fit together. Gum disease can also be present with few symptoms, so routine examinations are important. Smoking, diabetes, some medications, hormonal changes, and difficulty cleaning around teeth or appliances can influence risk. Sudden facial swelling, fever, or severe pain requires prompt assessment rather than routine cleaning alone.',
    procedure_details: 'The dentist or periodontal clinician reviews medical history and risk factors, examines the gums, and may record pocket depths, bleeding, recession, tooth mobility, and other periodontal findings. X-rays may be used when appropriate to assess supporting bone. Treatment may begin with instruction in brushing and interdental cleaning and professional removal of deposits above and below the gum line. More advanced cases may require staged deep cleaning, reassessment, specialist referral, or surgical options. A supportive periodontal maintenance schedule is planned after active treatment.',
    benefits: 'Treatment can reduce gum inflammation, bleeding, and bacterial deposits and may help stabilise periodontal disease. Early gingivitis can often be improved when plaque control is effective. In periodontitis, treatment aims to control disease and preserve remaining support; lost bone and attachment are not routinely restored by basic cleaning. Long-term results depend on home care, smoking status, general health, and regular maintenance.',
    aftercare: 'Follow the personalised brushing and interdental-cleaning instructions and attend all recommended maintenance visits. Some tenderness or sensitivity may occur after deeper cleaning. Stop smoking if applicable and discuss diabetes control or medication-related dry mouth with your healthcare team. Contact the clinic for increasing swelling, pus, fever, severe pain, or a tooth that becomes newly loose. Do not stop maintenance once symptoms improve, because gum disease can recur without ongoing care.',
  },
  "dental-x-ray": {
    overview: 'A dental X-ray is an imaging examination used to help a dentist assess structures that cannot be fully evaluated by looking inside the mouth. Depending on the clinical question, images may show tooth roots, bone levels, areas between teeth, developing teeth, impacted teeth, or the relationship of structures before treatment. Different views are used for different purposes, and imaging should be selected only when it is expected to provide information that can affect diagnosis or care. An X-ray is an adjunct to, not a replacement for, clinical examination.',
    when_needed: 'The dentist may recommend imaging to investigate pain, decay between teeth, infection around a root, trauma, bone support, impacted teeth, or to plan certain procedures. The type and frequency depend on symptoms, clinical findings, age, dental history, and previous images. Routine imaging is not automatically required at every visit. Patients should tell the dental team if they are pregnant or may be pregnant, so the need and precautions can be considered.',
    procedure_details: "The dental professional explains why the image is needed and selects the appropriate view, such as a bitewing, periapical, panoramic, or other study. The patient is positioned and asked to remain still while the image is captured using the clinic's equipment and radiation-protection protocol. The dentist reviews the image together with the clinical findings and explains relevant results. If a specialist scan is needed, the dentist should explain its specific purpose and implications.",
    benefits: 'Dental imaging can reveal problems that may not be visible during a visual examination and can help guide diagnosis, treatment planning, and monitoring. Using the appropriate image can reduce uncertainty and help avoid unnecessary or unsuitable treatment. X-rays do not identify every condition, and findings must be interpreted in the context of symptoms and examination.',
    aftercare: 'No special aftercare is usually needed after a routine dental X-ray. Ask the dentist to explain any findings and whether follow-up or treatment is recommended. Keep copies of relevant images or reports when transferring care, where available, to help avoid unnecessary repeat imaging. Contact the clinic if you have questions about why an image was taken or what it showed.',
  },
  "tooth-sensitivity-management": {
    overview: 'Tooth sensitivity is a symptom rather than a diagnosis. It commonly presents as a short, sharp response to cold, heat, touch, sweet foods, or air, but similar symptoms can also arise from decay, cracks, worn restorations, gum recession, pulp inflammation, or other conditions. Management begins by identifying the cause rather than assuming all sensitivity is harmless. Treatment may involve preventive advice, desensitising products, fluoride, restoration of exposed or damaged areas, or further investigation depending on the findings.',
    when_needed: 'A dental assessment is appropriate when sensitivity is frequent, worsening, localised to one tooth, occurs spontaneously, lingers after the stimulus, or interferes with eating or drinking. Pain on biting, night pain, swelling, fever, or a history of trauma also requires prompt assessment. Gum recession, enamel wear, acidic diet, aggressive brushing, recent whitening, and clenching can contribute, but decay or pulp disease must be considered and ruled out where indicated.',
    procedure_details: 'The dentist asks about triggers, duration, location, recent dental treatment, diet, brushing habits, and medical history. The tooth, gums, bite, and existing restorations are examined; tests or X-rays may be recommended when clinically appropriate. Depending on the cause, management may include modifying brushing technique, using a desensitising toothpaste, applying professional fluoride or desensitising agents, treating decay, repairing a defect, or considering other treatment. The dentist explains when reassessment is needed.',
    benefits: 'Cause-directed management can reduce discomfort and help patients eat, drink, and clean their teeth more comfortably. Preventive measures may reduce further enamel wear or root sensitivity. The outcome depends on the underlying diagnosis; a desensitising product alone will not treat a cavity, cracked tooth, or inflamed dental pulp.',
    aftercare: 'Use a soft toothbrush and gentle technique, and avoid brushing immediately after acidic foods or drinks. A desensitising toothpaste may need regular use as directed to provide benefit. Limit frequent acidic drinks and do not place aspirin or unapproved substances on the tooth. Return for review if symptoms persist or worsen, and seek prompt care for spontaneous lingering pain, swelling, fever, or pain on biting.',
  },
  "dental-crown": {
    overview: "A dental crown is a custom-made restoration that covers much or most of a tooth to restore its shape, strength, and function. Crowns may be made from ceramic, metal, or combinations of materials, with selection based on the tooth's position, bite, appearance, available tooth structure, and clinical requirements. A crown is usually considered when a tooth has extensive damage or a large restoration that cannot be predictably managed with a smaller filling. Placing a crown generally requires preparation of the tooth, so the benefits and alternatives should be discussed before treatment.",
    when_needed: 'A crown may be recommended for a heavily restored or weakened tooth, a tooth with a significant fracture, or a tooth that has undergone root canal treatment and needs protection, depending on its remaining structure and location. It may also be used as part of a bridge or implant restoration. The dentist should assess decay, gum health, root condition, bite, and whether a more conservative restoration such as an onlay is suitable. A crown is not automatically required for every root-treated tooth.',
    procedure_details: 'The dentist examines the tooth and may take X-rays or other records. If a crown is appropriate, the tooth is shaped to create space for the restoration, and an impression or digital scan is taken. A temporary crown may protect the prepared tooth while the final crown is made. At the fitting visit, the dentist checks fit, contacts, shade, and bite before cementing or bonding the crown. The number of visits and exact materials depend on the case and laboratory workflow.',
    benefits: 'A crown can restore chewing function and cover weakened tooth structure, and a tooth-coloured material may improve appearance. In selected cases it can help protect a compromised tooth from further breakdown. Crowns require maintenance and can still develop complications such as recurrent decay at the margin, fracture, loosening, or gum irritation. They do not guarantee that the underlying tooth will never need further treatment.',
    aftercare: 'Keep the crown and gum line clean with daily brushing and interdental cleaning. Follow temporary-crown instructions and avoid sticky or very hard foods on a temporary restoration. After final fitting, report a high bite, persistent pain, looseness, or sensitivity that does not settle. Attend regular examinations so the dentist can monitor the crown margins, gums, and supporting tooth.',
  },
  "dental-bridges": {
    overview: 'A dental bridge is a fixed restoration used to replace one or more missing teeth by connecting an artificial tooth to supporting teeth or implants. Traditional bridges use prepared neighbouring teeth as supports; other designs may use different forms of support depending on the case. The choice depends on the number and position of missing teeth, condition of potential supporting teeth, gum and bone health, bite, cleaning access, and alternatives such as an implant or removable denture. A bridge is not suitable for every gap and may involve irreversible preparation of supporting teeth.',
    when_needed: "A bridge may be considered when a patient has one or more missing teeth and suitable supporting teeth or implants are available. The dentist evaluates the health and strength of potential abutment teeth, gum support, bite forces, space, and the patient's ability to clean beneath the bridge. Active gum disease or decay should be managed first. A removable partial denture, implant-supported replacement, or no immediate replacement may also be discussed depending on risks, costs, and patient preference.",
    procedure_details: 'The dentist examines the gap and supporting structures and may take X-rays, scans, or impressions. If a tooth-supported bridge is selected, the supporting teeth are prepared as required and a scan or impression is taken for laboratory fabrication. A temporary restoration may be provided. At fitting, the dentist checks fit, bite, appearance, and contacts before cementing the bridge. The patient is shown how to clean beneath the artificial tooth using suitable interdental aids or floss threaders.',
    benefits: 'A bridge can replace a missing tooth with a fixed restoration, improve the ability to chew, and help restore the appearance of the smile. It may also help maintain the position of adjacent teeth, although changes in tooth position are not the only consideration. The supporting teeth carry additional responsibilities and may be at risk of decay, gum problems, or other complications. A bridge does not behave exactly like a natural tooth and requires specific cleaning.',
    aftercare: 'Brush around the bridge and carefully clean underneath the artificial tooth every day using the aids recommended by the dentist. Attend reviews to check the supporting teeth, gums, bite, and bridge integrity. Avoid using the bridge to bite hard objects. Contact the clinic if it feels loose, traps food persistently, causes pain, or chips. Seek advice promptly if a supporting tooth becomes painful or swollen.',
  },
  "crowns-bridges": {
    overview: "Crowns and bridges are fixed restorative options used to restore damaged teeth and replace selected missing teeth. A crown covers an individual tooth to restore its form and function, while a bridge uses supporting teeth or implants to carry one or more artificial teeth across a gap. The appropriate restoration depends on the amount of remaining tooth structure, the condition of neighbouring teeth, gum and bone support, bite, appearance, cleaning access, and the patient's preferences. These treatments are not interchangeable in every case and require individual planning.",
    when_needed: 'A crown may be considered for a tooth that is significantly weakened, fractured, or heavily restored. A bridge may be considered when one or more teeth are missing and suitable support is available. The dentist should first assess decay, gum disease, root condition, bite, and the long-term outlook of the supporting teeth. Alternatives may include a filling, onlay, removable denture, implant-supported restoration, or monitoring. The dentist should explain whether preparing otherwise healthy supporting teeth is necessary and what that means for long-term maintenance.',
    procedure_details: "The process begins with a consultation, examination, and any required diagnostic imaging. The dentist discusses whether a crown, bridge, or another option is appropriate. For a crown or tooth-supported bridge, the relevant tooth or teeth are prepared, and digital scans or impressions are taken. A temporary restoration may be fitted while the final restoration is made. At the fitting appointment, the dentist checks the restoration's fit, bite, contacts, and appearance before cementing or bonding it. The patient receives instructions for cleaning and follow-up.",
    benefits: 'Crowns can restore the shape and function of compromised teeth, while bridges can replace selected missing teeth with a fixed option. Both may improve chewing comfort and appearance when well planned. Their success depends on case selection, supporting structures, oral hygiene, bite forces, and maintenance. Restorations can loosen, fracture, or develop recurrent decay or gum problems, so ongoing reviews are important.',
    aftercare: 'Clean around crown margins and beneath bridges every day using the techniques demonstrated by the dental team. Attend regular reviews and report looseness, chipping, persistent sensitivity, pain on biting, or gum swelling. Avoid chewing ice or very hard objects and discuss a protective night guard if you grind your teeth. Follow any special instructions while wearing a temporary restoration.',
  },
  "flexible-denture": {
    overview: "A flexible denture is a removable partial denture made from a flexible, resilient material intended to replace selected missing teeth. Its design may use flexible clasps or extensions to help retain the appliance, depending on the product and clinical case. It is one of several removable tooth-replacement options; suitability depends on the number and position of missing teeth, remaining teeth, gum and bone anatomy, bite, material properties, and the patient's dexterity and cleaning ability. It does not stop changes in the jaw ridge after tooth loss and may not be suitable for every long-term restorative need.",
    when_needed: 'A flexible denture may be discussed when a patient wants a removable way to replace selected missing teeth and the remaining oral structures can support the design. The dentist assesses the health and position of remaining teeth, gum condition, available space, bite, and areas where the appliance may place pressure. Active decay or gum disease should be addressed first. Other options, including a conventional acrylic or metal-framework partial denture, bridge, or implant-supported replacement, should be compared where appropriate.',
    procedure_details: 'The dentist examines the mouth and discusses the goals and limitations of a flexible appliance. Impressions or digital scans and bite records may be taken to design the denture. The appliance is fabricated and checked at fitting for retention, comfort, speech, appearance, and pressure areas. Adjustments may be needed as the patient adapts. The dentist demonstrates insertion, removal, cleaning, and storage and explains when to wear the denture and when to remove it.',
    benefits: 'A flexible partial denture can replace visible missing teeth with a removable option and may offer a less rigid feel for some patients. It can be removed for cleaning and may avoid preparing neighbouring teeth as is required for some tooth-supported bridges. Comfort and retention vary, and flexible materials can be difficult to adjust or reline in some designs. It does not provide the same stability or function as natural teeth or every fixed replacement.',
    aftercare: 'Remove and clean the denture as instructed, and clean the remaining teeth and gums separately every day. Use only cleaning products suitable for the denture material; avoid hot water that could distort it. Do not bend or force clasps or extensions. Remove it at night if advised, store it as directed, and attend reviews to check fit and tissue health. Contact the clinic if it causes ulcers, pain, looseness, or difficulty chewing.',
  },
  "acrylic-denture": {
    overview: 'An acrylic denture is a removable dental prosthesis made primarily from acrylic resin and used to replace some or all missing teeth. It may be designed as a partial denture, which replaces selected teeth, or a complete denture, which replaces all teeth in an arch. The fit depends on the shape of the gums and supporting ridge, the remaining teeth where present, saliva, muscle control, and changes in the mouth over time. Dentures can improve appearance and assist speech and chewing, but adaptation is individual and they do not function exactly like natural teeth.',
    when_needed: "An acrylic denture may be considered when teeth are missing and a removable replacement is preferred or clinically appropriate. It may be used as a temporary or longer-term option depending on the case. The dentist assesses oral tissues, remaining teeth, ridge shape, bite, medical history, and the patient's ability to manage the appliance. In some cases, other options such as a metal-framework denture, bridge, or implant-supported prosthesis may offer different advantages and should be discussed.",
    procedure_details: 'The dentist examines the mouth and takes impressions or digital records and bite measurements. Tooth shade, shape, and arrangement are discussed where relevant. Trial stages may be used to check appearance and bite before the final denture is processed. At delivery, the dentist checks fit, retention, pressure areas, speech, and occlusion, then provides instructions for insertion, removal, cleaning, and adaptation. Follow-up visits allow sore areas and fit concerns to be reviewed and adjusted.',
    benefits: 'An acrylic denture can replace missing teeth, support facial appearance, and help with speech and chewing. It is removable, which allows cleaning outside the mouth and may be suitable when fixed treatment is not chosen or possible. Dentures can move, cause sore spots, fracture, or become loose as the mouth changes. They may need adjustment, repair, reline, or replacement over time.',
    aftercare: "Clean the denture daily using a denture brush and a cleaner recommended for acrylic; avoid abrasive household products and hot water. Clean the gums, tongue, palate, and any remaining teeth separately. Follow the dentist's advice about overnight wear and storage. Do not attempt to adjust or repair the denture yourself. Attend reviews and return if it causes persistent soreness, becomes loose, cracks, or affects eating or speech.",
  },
  "prosthodontics": {
    overview: "Prosthodontics is the area of dentistry concerned with restoring and replacing teeth and related oral structures. Depending on a patient's needs, prosthodontic care may involve crowns, bridges, removable partial or complete dentures, implant-supported restorations, veneers, or more complex rehabilitation. The aim is to restore function, appearance, comfort, and oral health while considering the condition of remaining teeth and supporting tissues. Treatment planning can be multi-stage and may involve coordination with other dental disciplines or a laboratory.",
    when_needed: 'A prosthodontic consultation may be appropriate for missing teeth, severely worn or damaged teeth, failing restorations, difficulty chewing, changes in bite, or a need to replace an existing denture or bridge. Complex cases may require assessment of gum health, bone support, jaw relationships, and general health. The dentist should identify active disease and stabilise it before definitive rehabilitation where possible. The most suitable option depends on clinical findings, patient goals, maintenance capacity, and budget.',
    procedure_details: 'The dentist takes a detailed history and performs an examination of teeth, gums, bite, jaw function, and existing restorations. Photographs, X-rays, scans, impressions, and bite records may be used as needed. A treatment plan is developed to sequence any preventive, periodontal, endodontic, surgical, or restorative stages. Temporary restorations or trial dentures may be used to assess function and appearance before final fabrication. The dentist reviews the proposed materials, alternatives, risks, expected maintenance, and costs before treatment begins.',
    benefits: "Prosthodontic treatment can restore missing or damaged tooth structure and may improve chewing, speech, appearance, and comfort. A coordinated plan can address several related problems rather than treating each restoration in isolation. Outcomes depend on the patient's starting condition, design, materials, biological response, oral hygiene, and maintenance. Restorations require ongoing care and may need repair or replacement.",
    aftercare: 'Follow the specific cleaning and maintenance instructions for each restoration or appliance. Maintain excellent gum care and attend planned reviews so the dentist can monitor fit, bite, wear, and supporting tissues. Report new discomfort, looseness, fracture, or changes in chewing. Patients with removable prostheses should clean them as instructed and keep the underlying tissues healthy. Long-term maintenance is an essential part of prosthodontic care.',
  },
  "post-and-core": {
    overview: 'A post-and-core is a foundation restoration that may be used to support a crown when a tooth has lost a substantial amount of its natural crown structure. A post is placed within the prepared root canal space to help retain a core build-up; the core rebuilds the portion of the tooth that will support the final crown. A post does not strengthen the root and can introduce risks if the remaining tooth or root is unsuitable. The decision depends on the amount and quality of remaining tooth structure, root anatomy, periodontal support, and the planned final restoration.',
    when_needed: 'It may be considered for a tooth, often one that has undergone root canal treatment, when too little coronal tooth structure remains to retain a core and crown by itself. It is not required for every root-treated tooth. The dentist assesses cracks, ferrule, root length and shape, existing root filling, bone support, and the possibility of other restorative options. If the tooth is fractured or has a poor long-term prognosis, extraction or another plan may be discussed.',
    procedure_details: 'The dentist evaluates the tooth clinically and with imaging where indicated, then determines whether a post is appropriate. If proceeding, a portion of the root canal filling may be carefully removed to create space while preserving an adequate apical seal. A post is selected and fitted, then secured using an appropriate cement or bonding system. Core material is built around the post to create a foundation for the final crown. The tooth is then prepared and restored according to the overall crown plan.',
    benefits: 'In selected cases, a post-and-core can help retain a core build-up and allow a crown to restore a tooth with extensive loss of visible structure. It can support restoration of chewing function and appearance when the root and remaining tooth are suitable. It does not reinforce a weak root or eliminate the risk of root fracture, recurrent infection, or restoration failure.',
    aftercare: 'Avoid heavy chewing on a temporary restoration and follow instructions until the final crown is fitted. Keep the area clean and attend all planned appointments. After final restoration, maintain daily brushing and interdental cleaning and avoid biting hard objects. Contact the clinic if the tooth becomes painful, swollen, loose, or if the restoration fractures or feels high. Attend reviews to monitor the crown and supporting tooth.',
  },
  "root-canal-treatment": {
    overview: 'Root canal treatment is an endodontic procedure used to manage disease or injury affecting the dental pulp, the soft tissue inside a tooth that contains nerves and blood vessels. The treatment involves accessing the pulp space, cleaning and shaping the root canal system, and filling and sealing it to reduce the chance of persistent or new infection. The aim is to retain the natural tooth when its condition and restorability make that a reasonable option. Root canal treatment does not make a tooth immune to fracture, and a suitable final restoration is often an important part of the overall plan.',
    when_needed: 'It may be recommended when the pulp is irreversibly inflamed, infected, or exposed due to deep decay, trauma, cracks, or repeated dental procedures. Symptoms can include prolonged sensitivity to hot or cold, spontaneous pain, pain on biting, or swelling, although some teeth have few symptoms. Diagnosis is based on history, examination, vitality tests, percussion or bite tests, and imaging when appropriate. Not every painful tooth needs root canal treatment; other causes and alternatives must be considered.',
    procedure_details: 'The dentist assesses the tooth and explains the diagnosis, alternatives, risks, and expected stages. Local anaesthesia is used when appropriate, and the tooth is isolated to help keep the treatment area clean. An opening is made to access the pulp chamber; the canals are located, measured, cleaned, and shaped with instruments and irrigating solutions. The canal system is then filled and sealed when suitable. Depending on the case, treatment may be completed in one or more visits, and a temporary filling may be placed between visits. A permanent restoration, often a crown for a significantly weakened back tooth, may be recommended.',
    benefits: 'Root canal treatment can address disease within the pulp and may allow a natural tooth to be retained instead of removed. It can help resolve symptoms associated with pulp inflammation or infection when treatment is successful. The tooth may continue to require monitoring and restoration, and no procedure guarantees lifelong retention. Prognosis depends on the diagnosis, canal anatomy, tooth structure, cracks, periodontal health, and quality of the final restoration.',
    aftercare: "Follow the dentist's instructions and take prescribed or recommended medicines only as directed. Mild tenderness after treatment can occur, but contact the clinic if pain or swelling increases, a temporary filling comes out, or symptoms do not improve as explained. Avoid chewing hard foods on the tooth until it has been permanently restored. Complete the recommended crown or other final restoration and attend follow-up visits.",
  },
  "re-root-canal-treatment": {
    overview: 'Root canal retreatment, sometimes called re-root canal treatment, is a procedure in which a previously treated tooth is reopened so the dentist can reassess, clean, and reseal the root canal system. It may be considered when disease has not healed, symptoms persist, or a new problem develops after earlier treatment. Retreatment can be technically challenging because existing filling materials, posts, restorations, or altered canal anatomy may need to be managed. It is not always the best option; alternatives may include endodontic surgery, extraction, or monitoring in selected circumstances.',
    when_needed: 'Retreatment may be discussed when a tooth has persistent or recurring pain, swelling, a sinus tract, or radiographic findings suggesting ongoing or new disease. Causes can include missed canals, complex anatomy, inadequate sealing, leakage through a restoration, or a new cavity or crack. The dentist must assess whether the tooth is restorable, whether a crack is present, the quality of the existing root filling, and the supporting tissues. A specialist opinion may be appropriate for complex cases.',
    procedure_details: 'The dentist reviews previous records and images, examines the tooth, and explains options and risks. If retreatment is selected, the tooth is accessed and existing restorative or root filling materials may be removed as necessary. The canal system is re-examined, cleaned, disinfected, and reshaped where possible, then refilled and sealed. A temporary restoration may be placed before definitive restoration. The number of visits depends on the complexity and clinical findings; some cases require specialist equipment or referral.',
    benefits: 'In suitable cases, retreatment may control persistent or recurrent endodontic disease and preserve the natural tooth. It may avoid extraction when the tooth remains restorable and the cause can be addressed. Success is not guaranteed, and the outcome depends on the reason for failure, anatomy, cracks, remaining tooth structure, periodontal health, and final coronal seal.',
    aftercare: 'Attend all planned visits and follow instructions for temporary restorations and medicines. Avoid heavy chewing on the tooth until the final restoration is completed. Contact the clinic promptly if swelling, fever, increasing pain, or drainage occurs. Complete the recommended crown or other definitive restoration and attend clinical and radiographic reviews as advised.',
  },
  "single-sitting-root-canal-treatment": {
    overview: 'Single-sitting root canal treatment is an approach in which the necessary cleaning, shaping, and filling of a root canal system are completed during one appointment when the clinical circumstances permit. It is not a separate type of root canal therapy and is not suitable for every tooth. The decision depends on diagnosis, canal anatomy, the presence and extent of infection, ability to clean and dry the canals, patient comfort, and the time and equipment required. Some cases appropriately need multiple visits or specialist care.',
    when_needed: 'A single-visit approach may be considered for selected teeth when the dentist can complete the required treatment safely and predictably in one appointment. Complex anatomy, significant swelling, persistent drainage, difficulty achieving adequate disinfection or dryness, retreatment, or patient factors may make multiple visits more appropriate. The dentist should explain that the number of visits is determined by clinical need rather than convenience alone.',
    procedure_details: 'The dentist performs a full assessment and confirms the diagnosis and suitability for a one-visit approach. With appropriate anaesthesia and isolation, the pulp space is accessed, canals are located, measured, cleaned, shaped, and disinfected. If the clinical conditions are satisfactory, the canals are filled and sealed during the same visit. The tooth is then closed with a temporary or definitive restoration depending on the plan. If findings indicate that treatment should not be completed that day, the dentist may place an appropriate interim dressing and arrange another visit.',
    benefits: 'When appropriate, completing the endodontic stages in one appointment can reduce the number of treatment visits and avoid an interim period between cleaning and filling. The biological goals and standards of treatment remain the same as for multi-visit root canal therapy. A one-visit approach does not mean that the final crown or restoration can always be completed on the same day, nor does it guarantee a better outcome.',
    aftercare: 'Follow the same post-treatment instructions given for root canal therapy. Avoid heavy chewing until the tooth has its recommended definitive restoration. Temporary tenderness may occur; contact the clinic for increasing pain, swelling, fever, or a lost temporary filling. Attend the planned restoration and review appointments even if symptoms settle.',
  },
  "calcified-root-canal-treatment": {
    overview: 'Calcified root canal treatment refers to endodontic care in a tooth where the canal spaces have narrowed or become partly or extensively obstructed by mineralised tissue. Calcification can occur with ageing, after dental trauma, or following long-term irritation. Narrowed canals can be difficult to locate, negotiate, clean, and shape, making treatment more technically demanding. The presence of calcification alone does not always mean treatment is required; the dentist must establish whether there is pulpal disease and whether intervention is justified.',
    when_needed: 'Assessment may be considered when a calcified tooth shows signs or symptoms of pulp disease, such as pain, tenderness, swelling, or imaging changes around the root. Some calcified teeth remain symptom-free and may only need monitoring. The dentist evaluates the clinical history, tests, tooth restorability, and imaging. Complex cases may require referral to an endodontist and advanced imaging where clinically justified. Risks of attempting to locate a very narrow canal, including perforation or weakening of the tooth, should be discussed.',
    procedure_details: 'The dentist reviews symptoms, examination findings, and suitable radiographs or scans. If treatment is indicated, magnification, illumination, specialised instruments, and careful access techniques may be used to locate the canal pathway. The canal is negotiated cautiously, cleaned, disinfected, shaped as safely as possible, and sealed when appropriate. If the canal cannot be located or treatment cannot be completed safely, the dentist discusses referral or alternative management rather than continuing at undue risk.',
    benefits: 'In selected cases, treatment can manage endodontic disease and may allow retention of a tooth despite narrowed canal anatomy. Careful planning and appropriate equipment can improve the ability to treat challenging canals. The procedure is more complex and carries specific risks; success cannot be guaranteed and depends on anatomy, diagnosis, tooth structure, and the final restoration.',
    aftercare: "Follow the dentist's instructions and attend all review appointments. Avoid heavy chewing until the tooth has been definitively restored. Report persistent or increasing pain, swelling, or changes in the tooth. Complete the recommended restoration and monitoring plan. If referred to a specialist, bring relevant images and treatment records where possible.",
  },
  "wisdom-tooth-root-canal-treatment": {
    overview: 'Root canal treatment of a wisdom tooth is an endodontic procedure considered in selected circumstances when a third molar has pulp disease but may still be functional and predictably restorable. Wisdom teeth often have variable root and canal anatomy and can be difficult to access and clean. Their position, eruption status, contact with neighbouring teeth, ability to maintain hygiene, and role in chewing all affect the decision. Retaining a wisdom tooth is not automatically preferable to removal; the risks and benefits of each option should be evaluated individually.',
    when_needed: 'It may be considered when a wisdom tooth has a treatable pulp problem, is sufficiently erupted and accessible, has a useful role, and has a reasonable long-term prognosis. The dentist assesses decay, cracks, gum condition, root shape, access, opposing tooth contact, and the condition of the second molar. Extraction may be more appropriate if the tooth is poorly positioned, non-functional, difficult to clean, severely damaged, or associated with repeated infection. Imaging and specialist advice may be required.',
    procedure_details: 'The dentist examines the tooth and reviews appropriate imaging to assess its position and anatomy. The diagnosis, treatment options, access limitations, risks, and likely restoration are discussed. If root canal treatment is chosen, the tooth is anaesthetised and isolated where possible, the canal system is accessed, cleaned, disinfected, shaped, and sealed. The dentist then considers whether a durable restoration can be placed and whether the tooth can be maintained hygienically. Complex cases may be referred to an endodontist.',
    benefits: "For a carefully selected wisdom tooth, treatment may manage pulp disease while retaining a functional natural tooth. The decision must account for the practical difficulty of treatment and long-term cleaning. The procedure does not remove the risks associated with the tooth's position, and extraction may provide a more predictable solution in some cases.",
    aftercare: "Follow the dentist's instructions and attend the recommended restoration and review visits. Keep the back of the mouth clean using the technique advised. Contact the clinic promptly for worsening pain, swelling, fever, bad taste with discharge, or difficulty opening the mouth or swallowing. Seek urgent medical care for breathing or swallowing difficulty or rapidly spreading facial swelling.",
  },
  "dental-surgery": {
    overview: 'Dental surgery is a broad term covering procedures used to diagnose or treat conditions involving teeth, gums, jawbone, and surrounding oral tissues. The specific procedure may range from a minor soft-tissue intervention to a more complex operation. Because the term covers many different treatments, the dentist should identify the exact procedure, its purpose, expected benefits, alternatives, anaesthesia plan, risks, and recovery requirements before consent. The information on this page is general and does not replace procedure-specific instructions.',
    when_needed: "Surgery may be recommended when a condition cannot be managed adequately with preventive, restorative, or other non-surgical treatment. Examples can include removal of a tooth, management of certain infections, treatment of selected gum or bone conditions, or other procedures based on diagnosis. The dentist considers medical history, medications, allergies, bleeding risk, healing factors, and the patient's overall health. Urgent swelling, fever, or difficulty swallowing or breathing requires urgent assessment.",
    procedure_details: 'The process depends on the planned operation. The dentist examines the area and may request imaging or other tests, then explains the steps, anaesthesia, risks, alternatives, and post-operative care. Written consent is obtained before proceeding. The procedure is performed using appropriate infection-control and surgical techniques. The patient receives instructions about bleeding control, eating, oral hygiene, activity, medication, and review appointments. More complex procedures may require referral to an oral surgeon or another specialist.',
    benefits: "When clinically indicated, dental surgery can address a problem that cannot be managed predictably with non-surgical care. It may relieve a source of infection or pain, remove damaged tissue or a tooth, or support a broader restorative plan. The benefits and risks vary substantially with the exact procedure and the patient's health; no general outcome can be promised for all dental surgery.",
    aftercare: 'Follow the written instructions specific to the operation. Use prescribed medicines only as directed and do not exceed recommended doses. Protect the surgical site, avoid disturbing any clot or sutures, and follow advice about food, rinsing, brushing, smoking, and physical activity. Contact the clinic for uncontrolled bleeding, increasing swelling, fever, pus, or severe worsening pain. Seek emergency care for breathing or swallowing difficulty or rapidly spreading swelling.',
  },
  "tooth-extraction": {
    overview: "Tooth extraction is the removal of a tooth from its socket when it cannot be predictably retained or when removal is otherwise clinically indicated. Extractions may be straightforward or surgical depending on the tooth's position, root shape, surrounding bone, and access. Preserving a natural tooth should be considered where feasible, so the dentist should explain reasonable alternatives such as restoration, root canal treatment, or periodontal care before recommending removal. The effects of a missing tooth and possible replacement options should also be discussed when relevant.",
    when_needed: 'Extraction may be considered for a tooth with extensive decay that cannot be restored, certain fractures, advanced periodontal support loss, severe infection where the tooth cannot be retained, or other specific clinical reasons. It may also be part of an orthodontic or surgical plan. The dentist assesses the tooth, adjacent structures, medical history, medications, and imaging where indicated. Blood-thinning medicines, diabetes, smoking, and some medical conditions can affect planning and healing and should be disclosed.',
    procedure_details: 'The dentist explains the reason for extraction, alternatives, risks, and expected recovery. Appropriate local anaesthesia is administered and its effectiveness checked. A simple extraction involves loosening and removing the tooth with suitable instruments; a surgical extraction may require an incision, removal of a small amount of bone, or sectioning of the tooth. The site is inspected, bleeding is controlled, and sutures may be placed when needed. Written aftercare instructions are provided before the patient leaves.',
    benefits: 'Extraction can remove a tooth that is a source of pain, infection, or ongoing damage when preservation is not a suitable option. It may allow surrounding tissues to heal and can be part of a broader treatment plan. It leaves a space and may affect chewing, appearance, or neighbouring teeth depending on the tooth removed. Replacement options and timing should be discussed when appropriate.',
    aftercare: 'Bite on the gauze as instructed to help control bleeding and protect the forming clot. Avoid smoking, vaping, alcohol, vigorous rinsing, spitting, straws, and strenuous activity for the period specified by the dentist. Eat soft foods initially and keep the area clean according to instructions; do not probe the socket. Use medicines only as directed. Contact the clinic for heavy or persistent bleeding, fever, increasing swelling, pus, or worsening pain. Seek urgent care for breathing or swallowing difficulty.',
  },
  "pediatric-dentistry": {
    overview: "Pediatric dentistry focuses on the oral health of infants, children, and adolescents. Care includes monitoring the development of primary and permanent teeth, prevention of decay, oral-hygiene and dietary guidance, assessment of dental injuries, and age-appropriate treatment when needed. A child's dental needs change as they grow, so visits should be adapted to their age, development, communication, and comfort. Positive early experiences can help children become familiar with dental care and support healthy habits into adulthood.",
    when_needed: "Children may benefit from routine dental visits as well as assessment for toothache, sensitivity, visible cavities, swelling, bleeding gums, dental injury, delayed or unusual eruption, or difficulty eating. Early assessment is useful because decay in primary teeth can cause pain and infection and may affect a child's wellbeing. The dentist can also advise on brushing, fluoride, diet, thumb-sucking, pacifiers, and injury prevention. Facial swelling, fever with dental pain, or trauma involving a permanent tooth requires prompt assessment.",
    procedure_details: "The dentist reviews the child's medical history and concerns with the parent or guardian, then examines the teeth, gums, bite, and oral development using an age-appropriate approach. X-rays are taken only when clinically indicated. The dentist explains findings in language suitable for the child and caregiver and discusses prevention or treatment options. Care may include brushing instruction, fluoride, sealants where appropriate, fillings, or referral for more complex needs. The child's cooperation, consent/assent, safeguarding, and comfort are considered throughout.",
    benefits: 'Regular paediatric dental care can help identify decay and developmental concerns early, support healthy habits, and reduce the likelihood that preventable problems progress. Age-appropriate communication and gradual familiarisation may help children feel more comfortable with dental visits. Outcomes depend on home care, diet, risk factors, attendance, and timely treatment; routine visits do not eliminate all risk of decay or injury.',
    aftercare: "Parents or caregivers should help children brush twice daily with an age-appropriate amount of fluoride toothpaste and supervise brushing until the child has the ability to clean effectively. Encourage water between meals, limit frequent sugary snacks and drinks, and follow the dentist's advice about fluoride and preventive care. Follow any treatment-specific instructions and attend recommended reviews. Seek prompt dental advice after injury, persistent pain, swelling, or visible changes to a tooth.",
  },
};

function getServiceContent(service: Service): ServiceContent {
  const slug = service.slug.toLowerCase();
  if (SERVICE_CONTENT[slug]) return SERVICE_CONTENT[slug];

  const name = service.name.toLowerCase();
  if (name.includes("root canal")) return SERVICE_CONTENT["root-canal-treatment"];
  if (name.includes("cleaning")) return SERVICE_CONTENT["dental-cleaning"];
  if (name.includes("whitening")) return SERVICE_CONTENT["teeth-whitening"];
  if (name.includes("veneer")) return SERVICE_CONTENT["dental-veneers"];
  if (name.includes("crown")) return SERVICE_CONTENT["dental-crown"];
  if (name.includes("bridge")) return SERVICE_CONTENT["dental-bridges"];
  if (name.includes("denture")) return SERVICE_CONTENT["acrylic-denture"];
  if (name.includes("extraction")) return SERVICE_CONTENT["tooth-extraction"];
  if (name.includes("pediatric")) return SERVICE_CONTENT["pediatric-dentistry"];
  if (name.includes("surgery")) return SERVICE_CONTENT["dental-surgery"];
  if (name.includes("fluoride")) return SERVICE_CONTENT["fluoride-treatment"];
  if (name.includes("gum")) return SERVICE_CONTENT["gum-disease-treatment"];
  if (name.includes("filling")) return SERVICE_CONTENT["dental-filling"];
  return SERVICE_CONTENT["general-dentistry"];
}

type Service = {
  id: number;
  name: string;
  slug: string;
  category: string;
  short_description: string | null;
  overview: string | null;
  when_needed: string | null;
  procedure_details: string | null;
  benefits: string | null;
  aftercare: string | null;
  duration_minutes: number;
  price: number | string | null;
  image: string | null;
  faqs: FAQ[];
};


const STATIC_SERVICES: Service[] = Object.entries(SERVICE_CONTENT).map(
  ([slug, content], index) => {
    const nameBySlug: Record<string, string> = {
      "dental-jewellery": "Dental Jewellery",
      "dental-veneers": "Dental Veneers",
      "digital-smile-design": "Digital Smile Design",
      "hollywood-smile": "Hollywood Smile",
      "snap-on-smile": "Snap-On Smile",
      "teeth-whitening": "Teeth Whitening",
      "general-dentistry": "General Dentistry",
      "dental-cleaning": "Dental Cleaning",
      "dental-polishing": "Dental Polishing",
      "dental-filling": "Dental Filling",
      "fluoride-treatment": "Fluoride Treatment",
      "gum-disease-treatment": "Gum Disease Treatment",
      "dental-x-ray": "Dental X-Ray",
      "tooth-sensitivity-management": "Tooth Sensitivity Management",
      "dental-crown": "Dental Crown",
      "dental-bridges": "Dental Bridges",
      "crowns-bridges": "Crowns and Bridges",
      "flexible-denture": "Flexible Denture",
      "acrylic-denture": "Acrylic Denture",
      "prosthodontics": "Prosthodontics",
      "post-and-core": "Post and Core",
      "root-canal-treatment": "Root Canal Treatment",
      "re-root-canal-treatment": "Re-Root Canal Treatment",
      "single-sitting-root-canal-treatment": "Single Sitting Root Canal Treatment",
      "calcified-root-canal-treatment": "Calcified Root Canal Treatment",
      "wisdom-tooth-root-canal-treatment": "Wisdom Tooth Root Canal Treatment",
      "dental-surgery": "Dental Surgery",
      "tooth-extraction": "Tooth Extraction",
      "pediatric-dentistry": "Pediatric Dentistry",
    };
    const name = nameBySlug[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const category = slug.includes("root-canal")
      ? "Root Canal Treatment"
      : ["dental-veneers", "dental-jewellery", "digital-smile-design", "hollywood-smile", "snap-on-smile", "teeth-whitening"].includes(slug)
        ? "Cosmetic Dentistry"
        : ["dental-crown", "dental-bridges", "crowns-bridges", "flexible-denture", "acrylic-denture", "prosthodontics", "post-and-core"].includes(slug)
          ? "Restorative Dentistry"
          : ["tooth-extraction", "dental-surgery"].includes(slug)
            ? "Oral Surgery"
            : "General Dentistry";
    return {
      id: index + 1,
      name,
      slug,
      category,
      short_description: content.overview.slice(0, 180).trim() + "...",
      overview: content.overview,
      when_needed: content.when_needed,
      procedure_details: content.procedure_details,
      benefits: content.benefits,
      aftercare: content.aftercare,
      duration_minutes: 30,
      price: null,
      image: null,
      faqs: [],
    };
  }
);

function ServiceDetail() {
  const { slug } = useParams<{
    slug: string;
  }>();

  const service = STATIC_SERVICES.find((item) => item.slug === slug) || null;
  const loading = false;
  const error = service ? "" : "We couldn't find this service.";

  /*
  ============================================================
  LOADING
  ============================================================
  */

  if (loading) {
    return (
      <div className="page-message">
        Loading treatment...
      </div>
    );
  }


  /*
  ============================================================
  ERROR
  ============================================================
  */

  if (error || !service) {
    return (
      <div className="page-message">

        <h2>
          Service not found
        </h2>

        <Link to="/services">
          ← Back to Services
        </Link>

      </div>
    );
  }


  /*
  ============================================================
  MAIN PAGE
  ============================================================
  */

  const fallbackContent = getServiceContent(service);

  return (
    <div className="site">

      {/* ======================================================
          NAVBAR
          ====================================================== */}

      <header className="navbar">

        <div className="container navbar-inner">

          <Link
            to="/"
            className="brand"
          >

            <div className="brand-logo">
              S
            </div>

            <div className="brand-text">

              <span className="brand-name">
                SPARKLING SMILE
              </span>

              <span className="brand-tagline">
                Dental Clinic
              </span>

            </div>

          </Link>


          <nav className="nav-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/services">
              Services
            </Link>

            <Link to="/#about">
              About
            </Link>

            <Link to="/#team">
              Our Team
            </Link>

            <Link to="/#gallery">
              Gallery
            </Link>

            <Link to="/#contact">
              Contact
            </Link>

          </nav>

        </div>

      </header>


      {/* ======================================================
          SERVICE HERO
          ====================================================== */}

      <section className="service-detail-hero">

        <div className="container">

          <Link
            to="/services"
            className="back-link"
          >
            ← Back to Services
          </Link>


          <p className="eyebrow">
            {service.category.toUpperCase()}
          </p>


          <h1>
            {service.name}
          </h1>


          {service.short_description && (
            <p className="service-hero-description">
              {service.short_description}
            </p>
          )}


          <div className="service-hero-actions">


            <a
              href="https://wa.me/971503002504"
              target="_blank"
              rel="noreferrer"
              className="whatsapp-button"
            >
              WhatsApp Us
            </a>

          </div>

        </div>

      </section>


      {/* ======================================================
          SERVICE CONTENT
          ====================================================== */}

      <main className="section">

        <div className="container service-detail-layout">

          <article className="service-detail-content">

            {/* ==================================================
                OVERVIEW
                ================================================== */}

            {(service.overview || fallbackContent.overview) && (

              <section className="service-detail-section">

                <p className="eyebrow">
                  OVERVIEW
                </p>

                <h2>
                  About {service.name}
                </h2>

                <p>
                  {service.overview || fallbackContent.overview}
                </p>

              </section>

            )}


            {/* ==================================================
                WHEN NEEDED
                ================================================== */}

            {(service.when_needed || fallbackContent.when_needed) && (

              <section className="service-detail-section">

                <p className="eyebrow">
                  WHEN IT MAY BE NEEDED
                </p>

                <h2>
                  When is this treatment recommended?
                </h2>

                <p>
                  {service.when_needed || fallbackContent.when_needed}
                </p>

              </section>

            )}


            {/* ==================================================
                PROCEDURE
                ================================================== */}

            {(service.procedure_details || fallbackContent.procedure_details) && (

              <section className="service-detail-section">

                <p className="eyebrow">
                  THE PROCESS
                </p>

                <h2>
                  What does the treatment involve?
                </h2>

                <p>
                  {service.procedure_details || fallbackContent.procedure_details}
                </p>

              </section>

            )}


            {/* ==================================================
                BENEFITS
                ================================================== */}

            {(service.benefits || fallbackContent.benefits) && (

              <section className="service-detail-section">

                <p className="eyebrow">
                  BENEFITS
                </p>

                <h2>
                  Benefits
                </h2>

                <p>
                  {service.benefits || fallbackContent.benefits}
                </p>

              </section>

            )}


            {/* ==================================================
                AFTERCARE
                ================================================== */}

            {(service.aftercare || fallbackContent.aftercare) && (

              <section className="service-detail-section">

                <p className="eyebrow">
                  AFTERCARE
                </p>

                <h2>
                  After your treatment
                </h2>

                <p>
                  {service.aftercare || fallbackContent.aftercare}
                </p>

              </section>

            )}


            {/* ==================================================
                FAQ
                ================================================== */}

            {service.faqs &&
              service.faqs.length > 0 && (

                <section className="service-detail-section">

                  <p className="eyebrow">
                    FAQ
                  </p>

                  <h2>
                    Frequently Asked Questions
                  </h2>


                  <div className="faq-list">

                    {service.faqs.map(
                      (faq) => (

                        <details
                          key={faq.id}
                          className="faq-item"
                        >

                          <summary>
                            {faq.question}
                          </summary>

                          <p>
                            {faq.answer}
                          </p>

                        </details>

                      )
                    )}

                  </div>

                </section>

              )}


            {/* ==================================================
                FINAL CTA
                ================================================== */}

            <section className="service-detail-section">

              <p className="eyebrow">
                NEXT STEP
              </p>

              <h2>
                Need a dental consultation?
              </h2>

              <p>
                Contact Sparkling Smile Dental Clinic on WhatsApp.
                Our team can help you enquire about the treatment
                and arrange the next steps with the clinic.
              </p>


              <div className="service-hero-actions">


                <a
                  href="https://wa.me/971503002504"
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-button"
                >
                  Enquire on WhatsApp
                </a>

              </div>

            </section>

          </article>


          {/* ====================================================
              SIDEBAR
              ==================================================== */}

          <aside className="service-sidebar">

            <div className="service-sidebar-card">

              <p className="eyebrow">
                TREATMENT INFORMATION
              </p>


              <h3>
                {service.name}
              </h3>
<a
                href="https://wa.me/971503002504"
                target="_blank"
                rel="noreferrer"
                className="whatsapp-button full-width"
              >
                Enquire on WhatsApp
              </a>

            </div>

          </aside>

        </div>

      </main>


      {/* ======================================================
          FOOTER
          ====================================================== */}

      <footer className="footer">

        <div className="container footer-inner">

          <div>

            <strong>
              SPARKLING SMILE DENTAL CLINIC
            </strong>

            <p>
              Professional dental care for every smile.
            </p>

          </div>


          <div className="footer-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/services">
              Services
            </Link>

            <Link to="/#about">
              About
            </Link>

            <Link to="/#contact">
              Contact
            </Link>

          </div>

        </div>


        <div className="container copyright">

          © {new Date().getFullYear()}
          {" "}
          Sparkling Smile Dental Clinic.
          All rights reserved.

        </div>

      </footer>

    </div>
  );
}

export default ServiceDetail;