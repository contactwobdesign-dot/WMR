import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingBottom: 60,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  // ——— BANDEAU EN-TÊTE OR/AMBER ———
  headerBand: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#D97706',
  },
  headerRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 16,
  },
  headerLogo: {
    width: 120,
    height: 50,
    objectFit: 'contain',
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: '#1F2937',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  // ——— LES PARTIES ———
  partiesWrapper: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    marginBottom: 12,
  },
  partiesRow: {
    flexDirection: 'row',
  },
  partyCol: {
    flex: 1,
    paddingHorizontal: 8,
  },
  partyLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  partyValue: {
    fontSize: 10,
    color: '#1F2937',
    lineHeight: 1.4,
    marginBottom: 2,
  },
  // ——— CORPS ———
  intro: {
    fontSize: 10,
    color: '#374151',
    textAlign: 'justify',
    lineHeight: 1.45,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  articleTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  bodyText: {
    fontSize: 10,
    color: '#374151',
    textAlign: 'justify',
    lineHeight: 1.45,
    marginBottom: 4,
  },
  // ——— TABLEAU (en-tête gris + colonnes Description, Date, Montant) ———
  tableWrapper: {
    marginTop: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  tableHeaderColDesc: {
    flex: 2,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  tableHeaderColDate: {
    width: 72,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  tableHeaderColAmount: {
    width: 64,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  tableRowAlt: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  tableColDesc: {
    flex: 2,
    fontSize: 10,
    color: '#374151',
  },
  tableColDate: {
    width: 72,
    fontSize: 9,
    color: '#6B7280',
  },
  tableColAmount: {
    width: 64,
    fontSize: 10,
    color: '#1F2937',
    textAlign: 'right',
  },
  tableRowTotal: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
  },
  tableTotalLabel: {
    flex: 2,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
  },
  tableTotalSpacer: {
    width: 72,
  },
  tableTotalValue: {
    width: 64,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    textAlign: 'right',
  },
  tvaNote: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'justify',
  },
  // ——— MENTIONS LÉGALES ———
  legalBlock: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFFBEB',
    borderLeftWidth: 4,
    borderLeftColor: '#D97706',
  },
  legalText: {
    fontSize: 9,
    lineHeight: 1.45,
    color: '#78350F',
    marginBottom: 4,
    textAlign: 'justify',
  },
  legalTextLast: {
    fontSize: 9,
    lineHeight: 1.45,
    color: '#78350F',
    textAlign: 'justify',
  },
  // ——— SIGNATURES (deux encadrés) ———
  signatureZone: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  signatureBoxes: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 20,
  },
  signatureBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    minHeight: 48,
  },
  signatureBoxTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  signatureBoxNote: {
    fontSize: 8,
    color: '#9CA3AF',
    marginTop: 4,
  },
  // ——— PIED DE PAGE (absolument fixe en bas de chaque feuille) ———
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#9CA3AF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
  footerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerBrand: {
    fontSize: 9,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  footerPage: {
    fontSize: 9,
    color: '#9CA3AF',
  },
  watermarkContainer: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    textAlign: 'center',
    opacity: 0.06,
    transform: 'rotate(-30deg)',
  },
  watermarkText: {
    fontSize: 40,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
  },
})

/** Montants en centimes → chaîne EUR sans espace insécable (évite le slash en PDF). */
function formatCurrency(amount) {
  if (amount == null || Number.isNaN(amount)) return '—'
  const formatted = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount / 100)
  return formatted.replace(/\u202F/g, ' ').replace(/\s/g, ' ')
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr + 'Z').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatDateShort(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr + 'Z').toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function getDealValue(deal) {
  const total = Number(deal?.total_deal_value)
  if (!Number.isNaN(total) && total >= 0) return total
  return (Number(deal?.cash_amount) || 0) + (Number(deal?.gift_value) || 0)
}

/**
 * Document PDF – Contrat de prestation (look Cabinet d'avocats).
 * Props : client, userProfile, deals (array), totalAmount (centimes), rights ({ duration, territory, supports }), isPro (bool), t (i18n).
 */
export default function ContractDocument({ client, userProfile, deals = [], totalAmount, rights, isPro, t }) {
  const tSafe = t || (key => key)
  const list = Array.isArray(deals) && deals.length > 0 ? deals : []
  const total = totalAmount ?? list.reduce((s, d) => s + getDealValue(d), 0)
  const isVatPayer = Boolean(userProfile?.is_vat_payer)
  const totalVat = Math.round(Number(total) * 0.2)
  const totalTtc = Math.round(Number(total) * 1.2)
  const creatorName = userProfile?.legal_name?.trim() || '—'
  const creatorSiret = userProfile?.siret?.replace(/\s/g, '') || '—'
  const creatorAddress = userProfile?.address_fiscal?.trim() || '—'
  const brandName = client?.company_name?.trim() || '—'
  const brandAddressRaw = (client?.address || '').toString().trim()
  const brandAddress = brandAddressRaw || tSafe('pdf_contract.parties.address_not_provided')
  const clientSiret = client?.siret?.replace(/\s/g, '')?.trim()
  const r = rights && typeof rights === 'object' ? rights : {}
  const defaultDuration = tSafe('pdf_contract.article3.default_duration')
  const defaultTerritory = tSafe('pdf_contract.article3.default_territory')
  const defaultSupports = tSafe('pdf_contract.article3.default_supports')
  const rightsDuration = (r.duration != null && String(r.duration).trim() !== '') ? String(r.duration).trim() : defaultDuration
  const rightsTerritory = (r.territory != null && String(r.territory).trim() !== '') ? String(r.territory).trim() : defaultTerritory
  const rightsSupports = (r.supports != null && String(r.supports).trim() !== '') ? String(r.supports).trim() : defaultSupports
  const objectDescription =
    list.length === 0
      ? tSafe('pdf_contract.article1.object_default')
      : list.length === 1
        ? (list[0]?.description?.trim() || tSafe('pdf_contract.article1.object_single'))
        : tSafe('pdf_contract.article1.object_multi')

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {!isPro && (
          <View style={styles.watermarkContainer} fixed>
            <Text style={styles.watermarkText}>
              {tSafe('pdf_contract.watermark')}
            </Text>
          </View>
        )}
        {/* Bandeau supérieur or/amber + Logo centré + Titre */}
        <View style={styles.headerBand} fixed />
        <View style={styles.headerRow}>
          <Image src="/WMRpro.png" style={styles.headerLogo} />
          <Text style={styles.headerTitle}>{tSafe('pdf_contract.title')}</Text>
        </View>

        {/* Les parties */}
        <View style={styles.partiesWrapper}>
          <View style={styles.partiesRow}>
            <View style={styles.partyCol}>
              <Text style={styles.partyLabel}>{tSafe('pdf_contract.parties.provider_label')}</Text>
              <Text style={styles.partyValue}>{creatorName}</Text>
              <Text style={styles.partyValue}>{tSafe('pdf_contract.parties.siret', { siret: creatorSiret })}</Text>
              <Text style={styles.partyValue}>{creatorAddress}</Text>
            </View>
            <View style={styles.partyCol}>
              <Text style={styles.partyLabel}>{tSafe('pdf_contract.parties.client_label')}</Text>
              <Text style={styles.partyValue}>{brandName}</Text>
              {clientSiret ? <Text style={styles.partyValue}>{tSafe('pdf_contract.parties.siret', { siret: clientSiret })}</Text> : null}
              <Text style={styles.partyValue}>{brandAddress}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.intro}>
          {tSafe('pdf_contract.intro')}
        </Text>

        <Text style={styles.articleTitle}>{tSafe('pdf_contract.article1.title')}</Text>
        <Text style={styles.bodyText}>{objectDescription}</Text>
        {list.length > 0 && (
          <Text style={styles.bodyText}>
            {tSafe('pdf_contract.article1.reference_dates', { dates: list.map((d) => formatDate(d?.contract_date)).filter(Boolean).join(' ; ') || '—' })}
          </Text>
        )}

        <Text style={styles.articleTitle}>{tSafe('pdf_contract.article2.title')}</Text>
        <View style={styles.tableWrapper}>
          {/* En-tête du tableau */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderColDesc}>{tSafe('pdf_contract.article2.col_description')}</Text>
            <Text style={styles.tableHeaderColDate}>{tSafe('pdf_contract.article2.col_date')}</Text>
            <Text style={styles.tableHeaderColAmount}>{tSafe('pdf_contract.article2.col_amount')}</Text>
          </View>
          {/* Lignes deals */}
          {list.length > 0 ? (
            <>
              {list.map((deal, i) => {
                const desc = deal?.description?.trim() || tSafe('pdf_contract.article2.service_fallback')
                const dateLabel = formatDateShort(deal?.contract_date)
                const isAlt = i % 2 === 1
                return (
                  <View key={deal?.id || i} style={isAlt ? styles.tableRowAlt : styles.tableRow}>
                    <Text style={styles.tableColDesc}>{desc}</Text>
                    <Text style={styles.tableColDate}>{dateLabel}</Text>
                    <Text style={styles.tableColAmount}>{formatCurrency(getDealValue(deal))}</Text>
                  </View>
                )
              })}
              <View style={styles.tableRowTotal}>
                <Text style={styles.tableTotalLabel}>{tSafe('pdf_contract.article2.total_ht')}</Text>
                <View style={styles.tableTotalSpacer} />
                <Text style={styles.tableTotalValue}>{formatCurrency(total)}</Text>
              </View>
              {isVatPayer && (
                <>
                  <View style={styles.tableRowTotal}>
                    <Text style={styles.tableTotalLabel}>{tSafe('pdf_contract.article2.vat_20')}</Text>
                    <View style={styles.tableTotalSpacer} />
                    <Text style={styles.tableTotalValue}>{formatCurrency(totalVat)}</Text>
                  </View>
                  <View style={styles.tableRowTotal}>
                    <Text style={styles.tableTotalLabel}>{tSafe('pdf_contract.article2.total_ttc')}</Text>
                    <View style={styles.tableTotalSpacer} />
                    <Text style={styles.tableTotalValue}>{formatCurrency(totalTtc)}</Text>
                  </View>
                </>
              )}
            </>
          ) : (
            <>
              <View style={styles.tableRow}>
                <Text style={styles.tableColDesc}>—</Text>
                <Text style={styles.tableColDate}>—</Text>
                <Text style={styles.tableColAmount}>—</Text>
              </View>
              <View style={styles.tableRowTotal}>
                <Text style={styles.tableTotalLabel}>{tSafe('pdf_contract.article2.total_ht')}</Text>
                <View style={styles.tableTotalSpacer} />
                <Text style={styles.tableTotalValue}>{formatCurrency(total)}</Text>
              </View>
              {isVatPayer && (
                <>
                  <View style={styles.tableRowTotal}>
                    <Text style={styles.tableTotalLabel}>{tSafe('pdf_contract.article2.vat_20')}</Text>
                    <View style={styles.tableTotalSpacer} />
                    <Text style={styles.tableTotalValue}>{formatCurrency(totalVat)}</Text>
                  </View>
                  <View style={styles.tableRowTotal}>
                    <Text style={styles.tableTotalLabel}>{tSafe('pdf_contract.article2.total_ttc')}</Text>
                    <View style={styles.tableTotalSpacer} />
                    <Text style={styles.tableTotalValue}>{formatCurrency(totalTtc)}</Text>
                  </View>
                </>
              )}
            </>
          )}
        </View>
        {!isVatPayer && (
          <Text style={styles.tvaNote}>
            {tSafe('pdf_contract.article2.tva_note')}
          </Text>
        )}

        <Text style={styles.articleTitle}>{tSafe('pdf_contract.article3.title')}</Text>
        <Text style={styles.bodyText}>
          {tSafe('pdf_contract.article3.cession_text')}
        </Text>
        <Text style={styles.bodyText}>
          {tSafe('pdf_contract.article3.unless_otherwise')}
        </Text>
        <Text style={styles.bodyText}>
          {tSafe('pdf_contract.article3.duration', { duration: rightsDuration })}
        </Text>
        <Text style={styles.bodyText}>
          {tSafe('pdf_contract.article3.territory', { territory: rightsTerritory })}
        </Text>
        <Text style={styles.bodyText}>
          {tSafe('pdf_contract.article3.supports', { supports: rightsSupports })}
        </Text>

        <Text style={styles.articleTitle}>{tSafe('pdf_contract.article4.title')}</Text>
        <View style={styles.legalBlock}>
          <Text style={styles.legalText}>
            {tSafe('pdf_contract.article4.legal_1')}
          </Text>
          <Text style={styles.legalText}>
            {tSafe('pdf_contract.article4.legal_2')}
          </Text>
          <Text style={styles.legalTextLast}>
            {tSafe('pdf_contract.article4.legal_3')}
          </Text>
        </View>

        {/* Article 5 – Signatures : deux encadrés (wrap=false pour ne pas couper entre 2 pages) */}
        <View style={styles.signatureZone} wrap={false}>
          <Text style={styles.articleTitle}>{tSafe('pdf_contract.article5.title')}</Text>
          <Text style={styles.bodyText}>
            {tSafe('pdf_contract.article5.done_in')}
          </Text>
          <View style={styles.signatureBoxes}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureBoxTitle}>{tSafe('pdf_contract.article5.provider')}</Text>
              <Text style={styles.signatureBoxNote}>{tSafe('pdf_contract.article5.read_approved')}</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureBoxTitle}>{tSafe('pdf_contract.article5.client')}</Text>
              <Text style={styles.signatureBoxNote}>{tSafe('pdf_contract.article5.read_approved')}</Text>
            </View>
          </View>
        </View>

        {/* Footer : fixe en bas de chaque page, hors flux */}
        <View style={styles.footer} fixed>
          <View style={styles.footerInner}>
            <Text style={styles.footerBrand}>{tSafe('pdf_contract.footer.brand')}</Text>
            <Text style={styles.footerPage} render={({ pageNumber, totalPages }) => tSafe('pdf_contract.footer.page', { page: pageNumber, total: totalPages })} />
          </View>
        </View>
      </Page>
    </Document>
  )
}
