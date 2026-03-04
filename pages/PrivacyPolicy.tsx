
import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_NAME, UNIVERSITY_NAME } from '../constants';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      {/* Header */}
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumbs dark />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-full">
                <Shield size={24} />
              </div>
              <span className="text-chuo-red font-bold tracking-widest uppercase text-xs">
                Legal
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              プライバシーポリシー
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-gray-100 prose prose-gray max-w-none"
        >
          <p className="lead">
            {SITE_NAME}（以下「当学科」といいます）は、当学科のウェブサイト（以下「本サイト」といいます）において提供するサービス（情報提供、各種ご意見の受付等）の円滑な運営に必要な範囲で、本サイトを利用される皆様の情報を収集しています。収集した情報は利用目的の範囲内で適切に取り扱います。
          </p>

          <h3>1. 収集する情報の範囲</h3>
          <ul>
            <li>当サイトでは、インターネットドメイン名、IPアドレス、当サイトの閲覧等の情報を自動的に収集します。</li>
            <li>クッキー（Cookie）について、当サイトでは、ユーザビリティーの向上を目的とし、クッキーを使用しています。なお、クッキーの内容を含め、個人を特定する情報は一切収集しておりません。</li>
            <li>「お問い合わせ」等のご利用にあたっては、お名前、メールアドレス等の記入をお願いすることがあります。</li>
          </ul>

          <h3>2. 利用目的</h3>
          <ul>
            <li>収集した情報は、当サイトが提供するサービスを円滑に運営するための参考として利用します。</li>
            <li>お問い合わせ等で収集したご意見等は、今後のサイト運営の参考とさせていただきます。また、お問い合わせの回答や確認のご連絡のために、お名前、メールアドレスを利用します。</li>
          </ul>

          <h3>3. 利用及び提供の制限</h3>
          <p>
            当学科では、法令に基づく開示要請があった場合、不正アクセス、脅迫等の違法行為があった場合その他特別の理由のある場合を除き、収集した情報を2の利用目的以外の目的のために自ら利用し、又は第三者に提供いたしません。
            ただし、統計的に処理された当サイトのアクセス情報、利用者属性等の情報については公表することがあります。
          </p>

          <h3>4. 安全確保の措置</h3>
          <p>
            当学科は、収集した情報の漏えい、滅失又はき損の防止その他収集した情報の適切な管理のために必要な措置を講じます。
          </p>

          <h3>5. 適用範囲</h3>
          <p>
            本プライバシーポリシーは、本サイト内においてのみ適用されます。本サイトからリンクされている外部サイトにおける情報の取り扱いについては、それぞれの組織の責任において行われることになります。
          </p>

          <h3>6. その他</h3>
          <p>
            {UNIVERSITY_NAME}全体の個人情報保護方針については、大学公式サイトの「個人情報保護への取り組み」をご参照ください。
            当学科では、以上のプライバシーポリシーを必要に応じて改定することがあります。
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>最終更新日：2025年4月1日</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
