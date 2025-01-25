"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface DetailPageHeaderOption {
  id: string;
  title: string;
}

/**
 * 物件詳細ページ専用のヘッダーコンポーネント
 * @param headerOptions {DetailPageHeaderOption}
 */
function DetailPageHeader({
  headerOptions,
}: {
  headerOptions: DetailPageHeaderOption[];
}) {
  // ヘッダーが画面に表示されるかどうかを管理
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // 現在アクティブなセクション（スクロール位置が一致しているセクション）のIDを管理
  const [activeSection, setActiveSection] = useState<string>("");
  // ヘッダーリストがスクロール可能かどうかを管理
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  // ヘッダーのul要素への参照を保持するための ref。　DOM操作やスクロール判定などでこの要素にアクセスする
  const headerRef = useRef<HTMLUListElement>(null);

  /**
   * スクロール位置に基づいてアクティブなセクションを更新
   */
  const updateActiveSection = useCallback(() => {
    // ヘッダーの高さを考慮したスクロール位置
    const scrollPosition = window.scrollY + 56; // h-14 = height-[56px]

    for (const item of headerOptions) {
      // セクションのDOM要素
      const element = document.getElementById(item.id);
      if (
        element && // elementが存在するか
        element.offsetTop <= scrollPosition && // 要素の上端が現在のスクロール位置より上または同じ位置か
        element.offsetTop + element.offsetHeight > scrollPosition // 要素の下端が現在のスクロール位置より下にあるか
      ) {
        // 条件が成り立つ場合、現在のスクロール位置がこの要素の範囲内にある　 -> 現在アクティブなセクションIDを更新
        setActiveSection(item.id);
        // 条件が成立した時点でループを終了
        break;
      }
    }
  }, []);

  /**
   * ヘッダーがスクロール可能かをチェック
   */
  const checkScrollable = useCallback(() => {
    if (headerRef.current) {
      // scrollWidthがclientWidthを超える場合、スクロールが必要であると判断し、isScrollableをtrueに設定
      setIsScrollable(
        headerRef.current.scrollWidth > headerRef.current.clientWidth
      );
    }
  }, []);

  /**
   * スクロールイベントでヘッダーの表示/非表示を制御　（初回のみ実行）
   */
  useEffect(() => {
    const handleScroll = () => {
      // 現在の垂直方向のスクロール位置
      const currentScrollY = window.scrollY;

      // スクロール位置が96pxを超えた場合、ヘッダーを表示　（96pxは共通ヘッダーのPCサイズの高さ）
      // スクロールが共通のヘッダーの高さを超えると、詳細画面用のヘッダーを表示させる
      if (currentScrollY > 96) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // passive: true を設定することで、スクロールパフォーマンスを最適化
    window.addEventListener("scroll", handleScroll, { passive: true });

    // クリーンアップ関数: コンポーネントがアンマウントされた際にイベントリスナーを削除
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * スクロール位置に応じてアクティブセクションを更新
   */
  useEffect(() => {
    // スクロールイベントでupdateActiveSectionを呼び出す
    window.addEventListener("scroll", updateActiveSection);

    // クリーンアップ関数: コンポーネントがアンマウントされた際にスクロールイベントリスナーを削除
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [updateActiveSection]);

  /**
   * ヘッダーリストがリサイズされた際にスクロール可能かチェック
   */
  useEffect(() => {
    // ResizeObserverをインスタンス化し、リサイズイベントを監視
    const resizeObserver = new ResizeObserver(checkScrollable);
    if (headerRef.current) {
      // ヘッダーリスト要素に対して ResizeObserverを適用
      resizeObserver.observe(headerRef.current);
    }

    // クリーンアップ関数: コンポーネントがアンマウントされた際、または依存が変化した際に監視を解除
    return () => resizeObserver.disconnect();
  }, [checkScrollable]);

  /**
   * アクティブなセクションがヘッダーの中央に表示されるよう、スクロール位置を自動調整する
   */
  useEffect(() => {
    // ヘッダーが存在し、アクティブなセクションが設定されており、ヘッダーがスクロール可能な場合に処理を実行
    if (headerRef.current && activeSection && isScrollable) {
      // アクティブなセクションに対応する要素を取得
      const activeElement = headerRef.current.querySelector(
        `[data-section="${activeSection}"]`
      );
      if (activeElement) {
        // ヘッダー全体の領域（Rect情報）を取得
        const headerRect = headerRef.current.getBoundingClientRect();
        // アクティブな要素の領域（Rect情報）を取得
        const activeElementRect = activeElement.getBoundingClientRect();

        // ヘッダーの幅の中央位置を計算
        const headerCenter = headerRect.width / 2;
        // アクティブ要素の中央位置を計算
        const activeElementCenter =
          activeElementRect.left -
          headerRect.left +
          activeElementRect.width / 2;

        // ヘッダー内でアクティブ要素が中央に表示されるために必要なスクロール量を計算
        const scrollOffset = activeElementCenter - headerCenter;

        // ヘッダーのスクロール位置を調整して、アクティブな要素を中央に配置
        headerRef.current.scrollTo({
          left: headerRef.current.scrollLeft + scrollOffset,
          behavior: "smooth",
        });
      }
    }
  }, [activeSection, isScrollable]);

  return (
    <header
      className={`fixed base-px top-0 left-0 right-0 h-14 bg-white transition-transform duration-300 ease-in-out z-50 ${
        isVisible ? "translate-y-0 shadow-md" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto lg:px-12">
        <nav>
          <ul
            ref={headerRef}
            className="flex space-x-4 overflow-x-auto whitespace-nowrap items-center justify-start h-14"
          >
            {headerOptions.map((item) => (
              <li key={item.id} className="inline-block">
                <ScrollToSection
                  targetId={item.id}
                  title={item.title}
                  isActive={activeSection === item.id}
                  dataSectionAttr={item.id}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

/**
 * 各セクションにスクロールするボタンコンポーネント
 *
 * @params targetId {string} - 対象セクションのID
 * @params title {string} - ボタンに表示するテキスト
 * @params isActive {boolean} - 現在アクティブなセクションかどうか
 * @params dataSectionAttr {string} - カスタム属性として使用するセクションID
 */
function ScrollToSection({
  targetId,
  title,
  isActive,
  dataSectionAttr,
}: {
  targetId: string;
  title: string;
  isActive: boolean;
  dataSectionAttr: string;
}) {
  /**
   * ヘッダーの要素のクリックイベントを処理
   */
  const handleClick = useCallback(() => {
    // 対象セクションのIDを使って、該当の要素を取得
    const element = document.getElementById(targetId);
    if (element) {
      // ヘッダーの高さを考慮してスクロール位置を調整
      const headerOffset = 56; // h-14 = height-[56px]
      // 要素の位置（ビューポート基準）
      const elementPosition = element.getBoundingClientRect().top;
      // 現在のスクロール位置（ページ全体のYオフセット）を加味し、ヘッダー分を引いて調整
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      // 対象セクションにスムーズスクロール
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [targetId]);

  return (
    <button
      onClick={handleClick}
      data-section={dataSectionAttr}
      className={`text-sm tracking-wider lg:text-base focus:outline-none whitespace-nowrap px-2 py-1 transition-colors duration-200 ${
        isActive ? "text-themeColor font-bold" : "text-gray-400"
      }`}
    >
      {title}
    </button>
  );
}

export { DetailPageHeader };
export type { DetailPageHeaderOption };
