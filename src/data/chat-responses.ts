import type { RegulationSearchResult } from "@/types/chat";

interface ChatResponse {
  text: string;
  results: RegulationSearchResult[];
}

export const chatResponses: Record<string, ChatResponse> = {
  히알루론산: {
    text: "히알루론산나트륨(Sodium Hyaluronate)은 대표적인 보습 원료로, 조사한 5개국(한국, 중국, 일본, EU, 베트남) 모두에서 사용이 허용되어 있습니다. 별도의 농도 제한 없이 자유롭게 사용 가능하며, 고분자/저분자 다양한 분자량으로 활용됩니다. 수출 시 규제 이슈가 가장 적은 원료 중 하나입니다.",
    results: [
      { ingredientName: "히알루론산나트륨", inci: "SODIUM HYALURONATE", country: "KR", status: "허용", notes: "제한 없이 사용 가능" },
      { ingredientName: "히알루론산나트륨", inci: "SODIUM HYALURONATE", country: "CN", status: "허용", notes: "제한 없이 사용 가능" },
      { ingredientName: "히알루론산나트륨", inci: "SODIUM HYALURONATE", country: "JP", status: "허용", notes: "제한 없이 사용 가능" },
      { ingredientName: "히알루론산나트륨", inci: "SODIUM HYALURONATE", country: "EU", status: "허용", notes: "제한 없이 사용 가능" },
      { ingredientName: "히알루론산나트륨", inci: "SODIUM HYALURONATE", country: "VN", status: "허용", notes: "제한 없이 사용 가능" },
    ],
  },
  레티놀: {
    text: "레티놀(Retinol)은 주름 개선 대표 성분으로, 국가별 규제가 상이하여 주의가 필요합니다. 한국에서는 기능성 원료(2500IU/g), EU에서는 0.3%(얼굴)/0.05%(바디)로 제한되며, 2025년 EU 규제 강화가 예정되어 있습니다. 중국은 0.5% 이하 사용 가능하나 특수용도화장품 신고가 필요하며, 베트남은 조건부 허용으로 안전성 자료가 필요합니다.",
    results: [
      { ingredientName: "레티놀", inci: "RETINOL", country: "KR", status: "제한", maxConcentration: "기능성 원료 2500IU/g", notes: "KFDA 기능성화장품 심사 필요" },
      { ingredientName: "레티놀", inci: "RETINOL", country: "CN", status: "제한", maxConcentration: "0.5%", notes: "특수용도화장품 신고 필요" },
      { ingredientName: "레티놀", inci: "RETINOL", country: "JP", status: "허용", notes: "별도 농도 제한 없음" },
      { ingredientName: "레티놀", inci: "RETINOL", country: "EU", status: "제한", maxConcentration: "0.3% (얼굴), 0.05% (바디)", notes: "2025년 규제 강화 예정" },
      { ingredientName: "레티놀", inci: "RETINOL", country: "VN", status: "조건부허용", maxConcentration: "0.5%", notes: "수입 허가 시 안전성 자료 필요" },
    ],
  },
  나이아신아마이드: {
    text: "나이아신아마이드(Niacinamide)는 미백 기능성 원료로, 대부분의 국가에서 허용되어 있습니다. 한국에서는 기능성 화장품 원료로 2~5% 사용이 인정되며, 중국에서도 5% 이하로 사용 가능합니다. 미백, 피부 장벽 강화, 피지 조절 등 다기능 원료로 글로벌 수출에 유리한 성분입니다.",
    results: [
      { ingredientName: "나이아신아마이드", inci: "NIACINAMIDE", country: "KR", status: "허용", maxConcentration: "기능성 2~5%", notes: "고시형 미백 기능성 원료" },
      { ingredientName: "나이아신아마이드", inci: "NIACINAMIDE", country: "CN", status: "허용", maxConcentration: "5%", notes: "미백 특수화장품 등록 시 별도 심사" },
      { ingredientName: "나이아신아마이드", inci: "NIACINAMIDE", country: "JP", status: "허용", notes: "의약부외품 미백 유효성분으로 사용 가능" },
      { ingredientName: "나이아신아마이드", inci: "NIACINAMIDE", country: "EU", status: "허용", notes: "농도 제한 없음" },
      { ingredientName: "나이아신아마이드", inci: "NIACINAMIDE", country: "VN", status: "허용", notes: "제한 없이 사용 가능" },
    ],
  },
  비타민c: {
    text: "비타민C 관련 원료는 여러 형태가 있습니다. 순수 비타민C(아스코르빅애시드)는 모든 조사 국가에서 허용되나 안정성 이슈가 있으며, 안정화 유도체인 아스코르빌글루코사이드는 한국에서 미백 기능성 원료(2%)로 인정됩니다. 수출 시 비타민C 유도체의 종류에 따라 기능성 인증 요건이 달라지므로 확인이 필요합니다.",
    results: [
      { ingredientName: "아스코르빅애시드 (순수 비타민C)", inci: "ASCORBIC ACID", country: "KR", status: "허용", notes: "농도 제한 없음. 안정성 확보 필요" },
      { ingredientName: "아스코르빅애시드 (순수 비타민C)", inci: "ASCORBIC ACID", country: "CN", status: "허용", notes: "농도 제한 없음" },
      { ingredientName: "아스코르빌글루코사이드", inci: "ASCORBYL GLUCOSIDE", country: "KR", status: "허용", maxConcentration: "기능성 2%", notes: "고시형 미백 기능성 원료" },
      { ingredientName: "아스코르빌글루코사이드", inci: "ASCORBYL GLUCOSIDE", country: "CN", status: "허용", maxConcentration: "2%", notes: "미백 특수화장품 심사 필요" },
      { ingredientName: "아스코르빌글루코사이드", inci: "ASCORBYL GLUCOSIDE", country: "EU", status: "허용", notes: "농도 제한 없음" },
    ],
  },
  파라벤: {
    text: "파라벤류 방부제는 모든 조사 국가에서 사용이 제한되어 있으며, 종류별로 허용 농도가 다릅니다. 메틸/에틸파라벤은 단독 0.4%(혼합 0.8%), 프로필파라벤은 단독 0.14%로 EU에서 가장 엄격합니다. EU에서는 3세 미만 기저귀 부위 사용이 금지되어 있습니다. 소비자 인식 이슈로 파라벤프리(Paraben-Free) 트렌드가 강하며, 페녹시에탄올 등 대체 방부제 사용을 권장합니다.",
    results: [
      { ingredientName: "메틸파라벤", inci: "METHYLPARABEN", country: "KR", status: "제한", maxConcentration: "단독 0.4%, 혼합 0.8%", notes: "사용 가능하나 소비자 인식 주의" },
      { ingredientName: "메틸파라벤", inci: "METHYLPARABEN", country: "EU", status: "제한", maxConcentration: "단독 0.4%, 혼합 0.8%", notes: "3세 미만 기저귀 부위 사용 금지" },
      { ingredientName: "프로필파라벤", inci: "PROPYLPARABEN", country: "EU", status: "제한", maxConcentration: "단독 0.14%, 혼합 0.8%", notes: "3세 미만 기저귀 부위 사용 금지" },
      { ingredientName: "페녹시에탄올 (대체제)", inci: "PHENOXYETHANOL", country: "KR", status: "제한", maxConcentration: "1.0%", notes: "파라벤 대체 방부제로 가장 널리 사용" },
      { ingredientName: "페녹시에탄올 (대체제)", inci: "PHENOXYETHANOL", country: "EU", status: "제한", maxConcentration: "1.0%", notes: "파라벤 대체 방부제" },
    ],
  },
  자외선차단: {
    text: "자외선차단제는 무기(징크옥사이드, 티타늄디옥사이드)와 유기(옥틸메톡시신나메이트, 옥시벤존 등) 계열로 나뉩니다. 무기 차단제는 대부분 25% 이하로 사용 가능하며 안전성이 높습니다. EU에서는 나노 입자 별도 표기가 필요하고, 티타늄디옥사이드는 분무형 제품 사용이 금지되었습니다. 옥시벤존은 산호초 백화 및 내분비계 교란 우려로 규제가 강화되는 추세입니다.",
    results: [
      { ingredientName: "징크옥사이드", inci: "ZINC OXIDE", country: "KR", status: "제한", maxConcentration: "25%", notes: "무기 자외선차단제, 안전성 높음" },
      { ingredientName: "징크옥사이드", inci: "ZINC OXIDE", country: "EU", status: "제한", maxConcentration: "25%", notes: "나노 형태 별도 표기 필요" },
      { ingredientName: "티타늄디옥사이드", inci: "TITANIUM DIOXIDE", country: "EU", status: "제한", maxConcentration: "25%", notes: "2022년부터 분무형 제품 사용 금지" },
      { ingredientName: "에칠헥실메톡시신나메이트", inci: "ETHYLHEXYL METHOXYCINNAMATE", country: "EU", status: "제한", maxConcentration: "10%", notes: "내분비계 교란 우려 재평가 중" },
      { ingredientName: "옥시벤존", inci: "BENZOPHENONE-3", country: "EU", status: "제한", maxConcentration: "6%", notes: "산호초 백화 우려, 규제 강화 추세" },
    ],
  },
  방부제: {
    text: "화장품 방부제는 국가별로 허용 농도가 엄격히 규제됩니다. 페녹시에탄올(1.0%)이 가장 널리 사용되는 방부제이며, 파라벤류는 소비자 인식 이슈로 기피 추세입니다. 포름알데히드는 전 세계적으로 금지되어 있습니다. 최근에는 에칠헥실글리세린, 1,2-헥산디올 등 방부 보조제와 병용하여 방부력을 확보하는 추세입니다.",
    results: [
      { ingredientName: "페녹시에탄올", inci: "PHENOXYETHANOL", country: "KR", status: "제한", maxConcentration: "1.0%", notes: "가장 널리 사용되는 대체 방부제" },
      { ingredientName: "메틸파라벤", inci: "METHYLPARABEN", country: "KR", status: "제한", maxConcentration: "단독 0.4%, 혼합 0.8%", notes: "파라벤계, 소비자 기피 추세" },
      { ingredientName: "벤질알코올", inci: "BENZYL ALCOHOL", country: "EU", status: "제한", maxConcentration: "1.0%", notes: "알레르기 유발 향료 성분으로도 표기 필요" },
      { ingredientName: "에칠헥실글리세린", inci: "ETHYLHEXYLGLYCERIN", country: "KR", status: "허용", notes: "방부 보조제, 페녹시에탄올과 병용 권장" },
      { ingredientName: "포름알데히드", inci: "FORMALDEHYDE", country: "KR", status: "금지", notes: "전 세계적으로 화장품 사용 금지" },
    ],
  },
  중국: {
    text: "중국(NMPA) 화장품 수출 시 주요 유의사항입니다. 일반화장품은 '비안(备案)' 신고제로 비교적 간편하나, 미백/자외선차단 등 특수용도화장품은 별도 등록이 필요하며 심사 기간이 길습니다(약 5~12개월). 신원료(중국 미등록 원료)를 사용할 경우 별도의 신원료 등록 절차가 필요하며, 동물실험 관련 규제도 주의해야 합니다. 2021년부터 일반화장품은 동물실험 면제가 가능하나 조건이 있습니다.",
    results: [
      { ingredientName: "나이아신아마이드", inci: "NIACINAMIDE", country: "CN", status: "허용", maxConcentration: "5%", notes: "미백 특수화장품 등록 시 별도 심사" },
      { ingredientName: "레티놀", inci: "RETINOL", country: "CN", status: "제한", maxConcentration: "0.5%", notes: "특수용도화장품 신고 필요" },
      { ingredientName: "트라넥사믹애시드", inci: "TRANEXAMIC ACID", country: "CN", status: "제한", maxConcentration: "2%", notes: "특수용도화장품 신고 필요" },
      { ingredientName: "아세틸헥사펩타이드-8", inci: "ACETYL HEXAPEPTIDE-8", country: "CN", status: "조건부허용", notes: "신원료 등록 필요할 수 있음" },
      { ingredientName: "비피더스균용해물", inci: "BIFIDA FERMENT LYSATE", country: "CN", status: "조건부허용", notes: "신원료 등록 또는 기존 원료 확인 필요" },
    ],
  },
};

export const defaultResponse: ChatResponse = {
  text: "해당 키워드에 대한 상세 규제 정보를 찾지 못했습니다. 구체적인 성분명(예: 히알루론산, 레티놀, 나이아신아마이드)이나 카테고리(예: 방부제, 자외선차단)로 검색해 주세요. COSFLOW 규제 데이터베이스에 등록된 50개 성분에 대한 5개국(한국/중국/일본/EU/베트남) 규제 현황을 확인할 수 있습니다.",
  results: [],
};
